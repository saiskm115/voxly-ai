import { AnimationMixer, Euler, Quaternion, LoopOnce, LoopRepeat, MathUtils, Color, Vector3 } from 'three';

export const EXPRESSIONS = {
  NEUTRAL: {
    HappyEyes: 0,
    SquintEyes: 0,
    WideEyes: 0,
    SadEyes: 0,
    MouthSmile: 0,
    MouthSad: 0,
    MouthOpen: 0,
    MouthWide: 0,
    MouthSurprised: 0,
  },
  HAPPY: {
    HappyEyes: 1.0,
    MouthSmile: 1.0,
    WideEyes: 0.1,
    SquintEyes: 0,
    SadEyes: 0,
    MouthSad: 0,
    MouthSurprised: 0,
  },
  THINKING: {
    SquintEyes: 0.9,
    MouthSmile: 0.35,
    HappyEyes: 0,
    WideEyes: 0,
    SadEyes: 0,
    MouthSad: 0,
    MouthSurprised: 0,
  },
  SURPRISED: {
    WideEyes: 1.0,
    MouthSurprised: 1.0,
    HappyEyes: 0,
    SquintEyes: 0,
    SadEyes: 0,
    MouthSmile: 0,
    MouthSad: 0,
  },
  EXCITED: {
    HappyEyes: 1.0,
    WideEyes: 0.6,
    MouthSmile: 1.0,
    MouthWide: 0.85,
    SquintEyes: 0,
    SadEyes: 0,
    MouthSad: 0,
  },
  ANGRY: {
    SquintEyes: 1.0,
    SadEyes: 0.85,
    MouthSad: 1.0,
    HappyEyes: 0,
    WideEyes: 0,
    MouthSmile: 0,
    MouthSurprised: 0,
  },
  SAD: {
    SadEyes: 1.0,
    MouthSad: 1.0,
    HappyEyes: 0,
    WideEyes: 0,
    SquintEyes: 0,
    MouthSmile: 0,
  },
  LISTENING: {
    WideEyes: 0.5,
    HappyEyes: 0.3,
    MouthSmile: 0.4,
    SquintEyes: 0,
    SadEyes: 0,
  },
  SPEAKING: {
    MouthOpen: 0.65,
    MouthSmile: 0.4,
    HappyEyes: 0.3,
  },
};

export const ALL_MORPH_NAMES = [
  'Blink',
  'BlinkLeft',
  'BlinkRight',
  'HappyEyes',
  'SadEyes',
  'WideEyes',
  'SquintEyes',
  'MouthSmile',
  'MouthSad',
  'MouthOpen',
  'MouthWide',
  'MouthSurprised',
];

// Left arm resting down & raised high wave targets (palm facing directly front towards user)
const TARGET_LEFT_UPPER_DOWN = new Quaternion(-0.735285, -0.45258, -0.45258, 0.22293);
const TARGET_LEFT_FORE_DOWN = new Quaternion(-0.222388, -0.239328, 0.054709, 0.943542);
const TARGET_LEFT_HAND_DOWN = new Quaternion(0.03179, -0.03796, 0.05855, 0.99705);
const TARGET_LEFT_UPPER_UP = new Quaternion(-0.45984, -0.50683, -0.50683, 0.5242);
const TARGET_LEFT_FORE_UP = new Quaternion(0.39513, 0.41876, 0.17929, 0.79773);
const TARGET_LEFT_HAND_UP = new Quaternion(0.04489, 0.12586, 0.10560, 0.98539);

// Right arm resting down & raised high wave targets (palm facing directly front towards user)
const TARGET_RIGHT_UPPER_DOWN = new Quaternion(-0.735285, 0.45258, 0.45258, 0.22293);
const TARGET_RIGHT_FORE_DOWN = new Quaternion(-0.222388, 0.239328, -0.054709, 0.943542);
const TARGET_RIGHT_HAND_DOWN = new Quaternion(0.03179, 0.03796, -0.05855, 0.99705);
const TARGET_RIGHT_UPPER_UP = new Quaternion(-0.45984, 0.50683, 0.50683, 0.5242);
const TARGET_RIGHT_FORE_UP = new Quaternion(0.39513, -0.41876, -0.17929, 0.79773);
const TARGET_RIGHT_HAND_UP = new Quaternion(0.1139, 0.7904, -0.0139, 0.6017);

export function createVoxlyController(gltf, { onExpressionChange } = {}) {
  const nodes = new Map(), bones = new Map(), materials = new Map();
  const clonedMaterials = new Map();

  gltf.scene.traverse((o) => {
    const name = o.userData.controlName || o.name;
    (o.isBone ? bones : nodes).set(name, o);
    if (o.material) {
      const clone = (m) => {
        if (!clonedMaterials.has(m)) clonedMaterials.set(m, m.clone());
        const result = clonedMaterials.get(m);
        materials.set(result.name, result);
        return result;
      };
      o.material = Array.isArray(o.material) ? o.material.map(clone) : clone(o.material);
    }
  });

  const face = ['LeftEye', 'RightEye', 'Mouth'].map((n) => nodes.get(n));
  const mixer = new AnimationMixer(gltf.scene);
  const clips = new Map(gltf.animations.map((c) => [c.name, c]));
  const rest = new Map([...bones].map(([n, b]) => [n, { q: b.quaternion.clone(), p: b.position.clone(), s: b.scale.clone() }]));
  const animated = new Map([...bones].map(([n, b]) => [n, { q: b.quaternion.clone(), p: b.position.clone(), s: b.scale.clone() }]));

  const ring = nodes.get('HoverRing');
  const ringScale = ring ? ring.scale.clone() : null;
  const ringRotation = ring ? ring.quaternion.clone() : null;
  const head = bones.get('Head');
  const body = bones.get('Body');
  const leftUpper = bones.get('LeftUpperArm');
  const leftFore = bones.get('LeftForearm');
  const leftHand = bones.get('LeftHand');
  const rightUpper = bones.get('RightUpperArm');
  const rightFore = bones.get('RightForearm');
  const rightHand = bones.get('RightHand');

  const rotation = new Quaternion();
  const euler = new Euler();
  const waveZAxis = new Vector3(0, 0, 1);
  const waveYAxis = new Vector3(0, 1, 0);

  const weights = Object.fromEntries(ALL_MORPH_NAMES.map((k) => [k, 0]));

  let state = 'IDLE';
  let expression = 'HAPPY';
  let action = null;
  let gesture = false;
  let time = 0;
  let amplitude = 0;
  let mouth = 0;
  let pointerX = 0;
  let pointerY = 0;
  let yaw = 0;
  let pitch = 0;
  let blinkStart = -10;
  let nextBlink = 3.0;
  let analyser = null;
  let samples = null;
  let talkingPreview = true;
  let isSpeaking = false;
  const overrides = new Map();

  const audioBars = [];
  for (let i = 0; i <= 4; i++) {
    const lBar = nodes.get(`LeftAudioBar${i}`);
    const rBar = nodes.get(`RightAudioBar${i}`);
    if (lBar) audioBars.push({ node: lBar, index: i });
    if (rBar) audioBars.push({ node: rBar, index: i });
  }

  // Procedural wave duration tracking
  let waveTimer = 0;
  const WAVE_DURATION = 2.4;

  // Multiple clicks special movements: two hands wave & 360 roll
  let twoHandsWaveTimer = 0;
  const TWO_HANDS_DURATION = 2.8;
  let rollTimer = 0;
  const ROLL_DURATION = 1.6;
  let rollProgress = 0;

  // New procedural interaction gestures: Think & Dance
  let thinkTimer = 0;
  const THINK_DURATION = 2.6;
  let danceTimer = 0;
  const DANCE_DURATION = 2.8;

  // Autonomous random idle expressions tracking (cycles between vivid expressions)
  let nextRandomExprTime = 3.0;
  let userExpressionLockUntil = 0;
  const RANDOM_IDLE_EXPRS = ['HAPPY', 'THINKING', 'SURPRISED', 'EXCITED', 'HAPPY', 'THINKING', 'SURPRISED'];
  let randomExprIndex = 0;

  const defaultGlowColor = new Color('#6344E7');
  const angryGlowColor = new Color('#FF3366');

  const clamp = (v) => (Number.isFinite(v) ? MathUtils.clamp(v, 0, 1) : 0);

  function play(name, once = false) {
    const clip = clips.get(name);
    if (!clip) {
      return;
    }
    const next = mixer.clipAction(clip);
    if (next === action && !once) return;
    next.reset().setLoop(once ? LoopOnce : LoopRepeat, once ? 1 : Infinity);
    next.clampWhenFinished = once;
    next.enabled = true;
    next.setEffectiveWeight(1).setEffectiveTimeScale(1).play();
    if (action && action !== next) next.crossFadeFrom(action, 0.25, false);
    action = next;
  }

  function finished(e) {
    if (gesture && e.action === action) {
      gesture = false;
      play(clips.has(state) ? state : 'IDLE');
    }
  }

  function setExpression(name, userInitiated = true) {
    const upper = String(name).toUpperCase();
    if (EXPRESSIONS[upper]) {
      expression = upper;
      if (userInitiated) {
        // Lock user-selected expression for 10 seconds before resuming gentle random idle expressions
        userExpressionLockUntil = time + 10.0;
      }
      const target = EXPRESSIONS[upper];
      for (const k of ALL_MORPH_NAMES) {
        weights[k] = target[k] !== undefined ? target[k] : 0;
      }
      if (!gesture && (state === 'IDLE' || state === 'HAPPY')) {
        const clipName = clips.has(upper) ? upper : 'IDLE';
        play(clipName);
      }
      if (onExpressionChange) {
        onExpressionChange(upper);
      }
    }
  }

  function startGesture(name = 'RIGHT_HAND_WAVE') {
    gesture = name;
    const upper = String(name).toUpperCase();
    if (upper === 'DOUBLE_WAVE' || upper === 'ROLL_DOUBLE_WAVE' || upper === 'TWO_HANDS_HI' || upper === 'CELEBRATE') {
      twoHandsWaveTimer = TWO_HANDS_DURATION;
      waveTimer = 0;
      thinkTimer = 0;
      danceTimer = 0;
      if (upper.includes('ROLL')) {
        rollTimer = ROLL_DURATION;
      }
      expression = 'EXCITED';
      setExpression('EXCITED', true);
      play(clips.has('EXCITED') ? 'EXCITED' : 'IDLE', true);
      return;
    }

    if (upper === 'THINK' || upper === 'THINKING') {
      thinkTimer = THINK_DURATION;
      waveTimer = 0;
      twoHandsWaveTimer = 0;
      rollTimer = 0;
      danceTimer = 0;
      setExpression('THINKING', true);
      play(clips.has('THINKING') ? 'THINKING' : 'IDLE', true);
      return;
    }

    if (upper === 'DANCE') {
      danceTimer = DANCE_DURATION;
      waveTimer = 0;
      twoHandsWaveTimer = 0;
      rollTimer = 0;
      thinkTimer = 0;
      setExpression('HAPPY', true);
      play(clips.has('HAPPY') ? 'HAPPY' : 'IDLE', true);
      return;
    }

    waveTimer = WAVE_DURATION;
    twoHandsWaveTimer = 0;
    rollTimer = 0;
    thinkTimer = 0;
    danceTimer = 0;
    setExpression('HAPPY', true);
    const clipName = clips.has('RIGHT_HAND_WAVE') ? 'RIGHT_HAND_WAVE' : (clips.has(name) ? name : 'WAVE');
    play(clipName, true);
  }

  mixer.addEventListener('finished', finished);
  play('IDLE');

  return {
    nodes,
    bones,
    materials,
    mixer,
    get state() {
      return gesture || state;
    },
    get expression() {
      return expression;
    },
    get rollProgress() {
      return rollProgress;
    },
    setState(name) {
      const upper = String(name).toUpperCase();
      if (upper === 'GREETING' || upper === 'WAVE' || upper === 'LEFT_HAND_WAVE' || upper === 'RIGHT_HAND_WAVE' || upper === 'DOUBLE_WAVE' || upper === 'ROLL_DOUBLE_WAVE') {
        startGesture(upper);
        return;
      }
      if (EXPRESSIONS[upper]) {
        setExpression(upper, true);
        return;
      }
      if (upper === 'TALKING' || upper === 'SPEAKING') {
        state = 'TALKING';
        isSpeaking = true;
        talkingPreview = true;
        const isGestureActive = gesture || waveTimer > 0 || twoHandsWaveTimer > 0 || rollTimer > 0 || thinkTimer > 0 || danceTimer > 0;
        if (!isGestureActive) {
          play('TALKING');
        }
        return;
      }
      if (upper === 'IDLE') {
        isSpeaking = false;
        state = 'IDLE';
        const isGestureActive = gesture || waveTimer > 0 || twoHandsWaveTimer > 0 || rollTimer > 0 || thinkTimer > 0 || danceTimer > 0;
        if (!isGestureActive) {
          gesture = false;
          play('IDLE');
        }
        return;
      }
      state = clips.has(upper) ? upper : 'IDLE';
      const isGestureActive = gesture || waveTimer > 0 || twoHandsWaveTimer > 0 || rollTimer > 0 || thinkTimer > 0 || danceTimer > 0;
      if (!isGestureActive) {
        gesture = false;
        play(state);
      }
    },
    setExpression(name, userInitiated = true) {
      setExpression(name, userInitiated);
    },
    setPointer(x, y) {
      pointerX = MathUtils.clamp(x, -1, 1);
      pointerY = MathUtils.clamp(y, -1, 1);
    },
    setAudioAmplitude(value) {
      amplitude = clamp(value);
    },
    setSpeaking(val) {
      isSpeaking = Boolean(val);
      if (isSpeaking) {
        talkingPreview = true;
      }
    },
    get isSpeaking() {
      return isSpeaking;
    },
    setTalkingPreview(enabled) {
      talkingPreview = Boolean(enabled);
    },
    attachAnalyser(node) {
      analyser = node;
      samples = node ? new Float32Array(node.fftSize) : null;
    },
    blink() {
      blinkStart = time;
      nextBlink = time + 3 + Math.random() * 3;
    },
    setMorph(name, value) {
      overrides.set(name, clamp(value));
    },
    clearMorph(name) {
      overrides.delete(name);
    },
    playGesture(name = 'RIGHT_HAND_WAVE') {
      startGesture(String(name).toUpperCase());
    },
    update(delta) {
      const dt = MathUtils.clamp(Number.isFinite(delta) ? delta : 0, 0, 0.1);
      time += dt;

      // Restore bone rest states before mixer update
      for (const [name, b] of bones) {
        const r = animated.get(name);
        if (r) {
          b.quaternion.copy(r.q);
          b.position.copy(r.p);
          b.scale.copy(r.s);
        }
      }

      mixer.update(dt);

      for (const [name, b] of bones) {
        const r = animated.get(name);
        if (r) {
          r.q.copy(b.quaternion);
          r.p.copy(b.position);
          r.s.copy(b.scale);
        }
      }

      // ROLL PROGRESS UPDATE:
      if (rollTimer > 0) {
        rollTimer -= dt;
        rollProgress = Math.max(0, Math.min(1, 1 - (rollTimer / ROLL_DURATION)));
      } else {
        rollProgress = 0;
      }

      // TWO HANDS HI MOVEMENT (BOTH ARMS WAVE EXCITEDLY):
      if (twoHandsWaveTimer > 0) {
        twoHandsWaveTimer -= dt;
        const progress = 1 - (twoHandsWaveTimer / TWO_HANDS_DURATION);
        let armWeight = 1;
        if (progress < 0.2) {
          armWeight = progress / 0.2;
        } else if (progress > 0.8) {
          armWeight = (1 - progress) / 0.2;
        }

        const waveOsc = Math.sin(time * 16) * 0.45 * armWeight;
        const handOsc = Math.sin(time * 16) * 0.38 * armWeight;

        // Left arm raises up and waves
        if (leftUpper) {
          leftUpper.quaternion.copy(TARGET_LEFT_UPPER_DOWN).slerp(TARGET_LEFT_UPPER_UP, armWeight);
          const rUpper = animated.get('LeftUpperArm');
          if (rUpper) rUpper.q.copy(leftUpper.quaternion);
        }
        if (leftFore) {
          leftFore.quaternion.copy(TARGET_LEFT_FORE_DOWN).slerp(TARGET_LEFT_FORE_UP, armWeight);
          leftFore.quaternion.multiply(new Quaternion().setFromAxisAngle(waveYAxis, -waveOsc * 0.4));
          const rFore = animated.get('LeftForearm');
          if (rFore) rFore.q.copy(leftFore.quaternion);
        }
        if (leftHand) {
          leftHand.quaternion.copy(TARGET_LEFT_HAND_DOWN).slerp(TARGET_LEFT_HAND_UP, armWeight);
          leftHand.quaternion.multiply(new Quaternion().setFromAxisAngle(waveZAxis, handOsc));
          const rHand = animated.get('LeftHand');
          if (rHand) rHand.q.copy(leftHand.quaternion);
        }

        // Right arm raises up and waves
        if (rightUpper) {
          rightUpper.quaternion.copy(TARGET_RIGHT_UPPER_DOWN).slerp(TARGET_RIGHT_UPPER_UP, armWeight);
          const rUpper = animated.get('RightUpperArm');
          if (rUpper) rUpper.q.copy(rightUpper.quaternion);
        }
        if (rightFore) {
          rightFore.quaternion.copy(TARGET_RIGHT_FORE_DOWN).slerp(TARGET_RIGHT_FORE_UP, armWeight);
          rightFore.quaternion.multiply(new Quaternion().setFromAxisAngle(waveYAxis, waveOsc * 0.4));
          const rFore = animated.get('RightForearm');
          if (rFore) rFore.q.copy(rightFore.quaternion);
        }
        if (rightHand) {
          rightHand.quaternion.copy(TARGET_RIGHT_HAND_DOWN).slerp(TARGET_RIGHT_HAND_UP, armWeight);
          rightHand.quaternion.multiply(new Quaternion().setFromAxisAngle(waveZAxis, -handOsc));
          const rHand = animated.get('RightHand');
          if (rHand) rHand.q.copy(rightHand.quaternion);
        }

        if (twoHandsWaveTimer <= 0) {
          gesture = false;
          play(isSpeaking ? 'TALKING' : (clips.has(state) ? state : 'IDLE'));
        }
      } else if (waveTimer > 0) {
        // PROCEDURAL SINGLE RIGHT HAND WAVE:
        waveTimer -= dt;
        const progress = 1 - (waveTimer / WAVE_DURATION); // 0 to 1
        let waveArmWeight = 1;
        if (progress < 0.22) {
          waveArmWeight = progress / 0.22; // Smooth raise
        } else if (progress > 0.78) {
          waveArmWeight = (1 - progress) / 0.22; // Smooth lower
        }

        // Strictly keep left arm down at rest
        if (leftUpper) {
          leftUpper.quaternion.copy(TARGET_LEFT_UPPER_DOWN);
          const rUpper = animated.get('LeftUpperArm');
          if (rUpper) rUpper.q.copy(TARGET_LEFT_UPPER_DOWN);
        }
        if (leftFore) {
          leftFore.quaternion.copy(TARGET_LEFT_FORE_DOWN);
          const rFore = animated.get('LeftForearm');
          if (rFore) rFore.q.copy(TARGET_LEFT_FORE_DOWN);
        }
        if (leftHand) {
          leftHand.quaternion.copy(TARGET_LEFT_HAND_DOWN);
          const rHand = animated.get('LeftHand');
          if (rHand) rHand.q.copy(TARGET_LEFT_HAND_DOWN);
        }

        // Wave right arm high up in the air
        if (rightUpper) {
          rightUpper.quaternion.copy(TARGET_RIGHT_UPPER_DOWN).slerp(TARGET_RIGHT_UPPER_UP, waveArmWeight);
          const rUpper = animated.get('RightUpperArm');
          if (rUpper) rUpper.q.copy(rightUpper.quaternion);
        }
        if (rightFore) {
          const waveOsc = Math.sin(time * 15) * 0.35 * waveArmWeight;
          rightFore.quaternion.copy(TARGET_RIGHT_FORE_DOWN).slerp(TARGET_RIGHT_FORE_UP, waveArmWeight);
          rightFore.quaternion.multiply(new Quaternion().setFromAxisAngle(waveYAxis, waveOsc * 0.4));
          const rFore = animated.get('RightForearm');
          if (rFore) rFore.q.copy(rightFore.quaternion);
        }
        if (rightHand) {
          const handOsc = Math.sin(time * 15) * 0.45 * waveArmWeight;
          rightHand.quaternion.copy(TARGET_RIGHT_HAND_DOWN).slerp(TARGET_RIGHT_HAND_UP, waveArmWeight);
          rightHand.quaternion.multiply(new Quaternion().setFromAxisAngle(waveZAxis, handOsc));
          const rHand = animated.get('RightHand');
          if (rHand) rHand.q.copy(rightHand.quaternion);
        }

        if (waveTimer <= 0) {
          gesture = false;
          play(isSpeaking ? 'TALKING' : (clips.has(state) ? state : 'IDLE'));
        }
      } else if (thinkTimer > 0) {
        // PROCEDURAL THOUGHTFUL CHIN TOUCH GESTURE:
        thinkTimer -= dt;
        const progress = 1 - (thinkTimer / THINK_DURATION);
        let armWeight = 1;
        if (progress < 0.22) {
          armWeight = progress / 0.22;
        } else if (progress > 0.78) {
          armWeight = (1 - progress) / 0.22;
        }

        // Left arm strictly at rest
        if (leftUpper) {
          leftUpper.quaternion.copy(TARGET_LEFT_UPPER_DOWN);
          const rUpper = animated.get('LeftUpperArm');
          if (rUpper) rUpper.q.copy(TARGET_LEFT_UPPER_DOWN);
        }
        if (leftFore) {
          leftFore.quaternion.copy(TARGET_LEFT_FORE_DOWN);
          const rFore = animated.get('LeftForearm');
          if (rFore) rFore.q.copy(TARGET_LEFT_FORE_DOWN);
        }
        if (leftHand) {
          leftHand.quaternion.copy(TARGET_LEFT_HAND_DOWN);
          const rHand = animated.get('LeftHand');
          if (rHand) rHand.q.copy(TARGET_LEFT_HAND_DOWN);
        }

        // Right arm raises thoughtfully toward chin / cheek
        if (rightUpper) {
          rightUpper.quaternion.copy(TARGET_RIGHT_UPPER_DOWN).slerp(TARGET_RIGHT_UPPER_UP, armWeight * 0.75);
          const rUpper = animated.get('RightUpperArm');
          if (rUpper) rUpper.q.copy(rightUpper.quaternion);
        }
        if (rightFore) {
          rightFore.quaternion.copy(TARGET_RIGHT_FORE_DOWN).slerp(TARGET_RIGHT_FORE_UP, armWeight * 0.95);
          const rFore = animated.get('RightForearm');
          if (rFore) rFore.q.copy(rightFore.quaternion);
        }
        if (rightHand) {
          rightHand.quaternion.copy(TARGET_RIGHT_HAND_DOWN).slerp(TARGET_RIGHT_HAND_UP, armWeight * 0.85);
          const rHand = animated.get('RightHand');
          if (rHand) rHand.q.copy(rightHand.quaternion);
        }

        if (thinkTimer <= 0) {
          gesture = false;
          play(isSpeaking ? 'TALKING' : (clips.has(state) ? state : 'IDLE'));
        }
      } else if (danceTimer > 0) {
        // PROCEDURAL RHYTHMIC GROOVE DANCE:
        danceTimer -= dt;
        const progress = 1 - (danceTimer / DANCE_DURATION);
        let armWeight = 1;
        if (progress < 0.2) {
          armWeight = progress / 0.2;
        } else if (progress > 0.8) {
          armWeight = (1 - progress) / 0.2;
        }

        const danceOscL = Math.sin(time * 11) * 0.45 * armWeight;
        const danceOscR = Math.sin(time * 11 + Math.PI) * 0.45 * armWeight;

        if (leftUpper) {
          leftUpper.quaternion.copy(TARGET_LEFT_UPPER_DOWN).slerp(TARGET_LEFT_UPPER_UP, armWeight * 0.65);
          leftUpper.quaternion.multiply(new Quaternion().setFromAxisAngle(waveYAxis, danceOscL * 0.3));
          const rUpper = animated.get('LeftUpperArm');
          if (rUpper) rUpper.q.copy(leftUpper.quaternion);
        }
        if (leftFore) {
          leftFore.quaternion.copy(TARGET_LEFT_FORE_DOWN).slerp(TARGET_LEFT_FORE_UP, armWeight * 0.7);
          const rFore = animated.get('LeftForearm');
          if (rFore) rFore.q.copy(leftFore.quaternion);
        }

        if (rightUpper) {
          rightUpper.quaternion.copy(TARGET_RIGHT_UPPER_DOWN).slerp(TARGET_RIGHT_UPPER_UP, armWeight * 0.65);
          rightUpper.quaternion.multiply(new Quaternion().setFromAxisAngle(waveYAxis, danceOscR * 0.3));
          const rUpper = animated.get('RightUpperArm');
          if (rUpper) rUpper.q.copy(rightUpper.quaternion);
        }
        if (rightFore) {
          rightFore.quaternion.copy(TARGET_RIGHT_FORE_DOWN).slerp(TARGET_RIGHT_FORE_UP, armWeight * 0.7);
          const rFore = animated.get('RightForearm');
          if (rFore) rFore.q.copy(rightFore.quaternion);
        }

        if (danceTimer <= 0) {
          gesture = false;
          play(isSpeaking ? 'TALKING' : (clips.has(state) ? state : 'IDLE'));
        }
      } else {
        // BOTH ARMS STRICTLY LOCKED DOWN AT REST
        if (leftUpper) {
          leftUpper.quaternion.copy(TARGET_LEFT_UPPER_DOWN);
          const rUpper = animated.get('LeftUpperArm');
          if (rUpper) rUpper.q.copy(TARGET_LEFT_UPPER_DOWN);
        }
        if (leftFore) {
          leftFore.quaternion.copy(TARGET_LEFT_FORE_DOWN);
          const rFore = animated.get('LeftForearm');
          if (rFore) rFore.q.copy(TARGET_LEFT_FORE_DOWN);
        }
        if (leftHand) {
          leftHand.quaternion.copy(TARGET_LEFT_HAND_DOWN);
          const rHand = animated.get('LeftHand');
          if (rHand) rHand.q.copy(TARGET_LEFT_HAND_DOWN);
        }

        if (rightUpper) {
          rightUpper.quaternion.copy(TARGET_RIGHT_UPPER_DOWN);
          const rUpper = animated.get('RightUpperArm');
          if (rUpper) rUpper.q.copy(TARGET_RIGHT_UPPER_DOWN);
        }
        if (rightFore) {
          rightFore.quaternion.copy(TARGET_RIGHT_FORE_DOWN);
          const rFore = animated.get('RightForearm');
          if (rFore) rFore.q.copy(TARGET_RIGHT_FORE_DOWN);
        }
        if (rightHand) {
          rightHand.quaternion.copy(TARGET_RIGHT_HAND_DOWN);
          const rHand = animated.get('RightHand');
          if (rHand) rHand.q.copy(TARGET_RIGHT_HAND_DOWN);
        }
      }

      // AUTONOMOUS RANDOM EXPRESSIONS WHEN IDLE (Every 4 to 6.5s):
      if (time > nextRandomExprTime && time > userExpressionLockUntil && waveTimer <= 0 && (state === 'IDLE' || state === 'HAPPY')) {
        randomExprIndex = (randomExprIndex + 1) % RANDOM_IDLE_EXPRS.length;
        const nextExpr = RANDOM_IDLE_EXPRS[randomExprIndex];
        setExpression(nextExpr, false);
        nextRandomExprTime = time + 4.0 + Math.random() * 2.5; // Every 4.0 - 6.5s
      }

      // Audio analysis if available
      if (analyser && samples) {
        if (samples.length !== analyser.fftSize) samples = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(samples);
        let sum = 0;
        for (let i = 0; i < samples.length; i++) {
          sum += samples[i] * samples[i];
        }
        amplitude = clamp((Math.sqrt(sum / samples.length) - 0.012) * 8);
      }

      const speaking = isSpeaking || state === 'SPEAKING' || state === 'TALKING';
      const liveSpeechCadence = 0.22 + 0.65 * Math.pow(Math.sin(time * 11), 2) * (0.65 + 0.35 * Math.sin(time * 5.5));
      const audioLevel = speaking 
        ? (amplitude > 0.02 ? amplitude : liveSpeechCadence) 
        : 0;
      mouth = MathUtils.damp(mouth, audioLevel, 20, dt);

      // HEADPHONE EQUALIZER AUDIO BARS ANIMATION:
      if (audioBars.length > 0) {
        for (const { node, index } of audioBars) {
          const barOsc = speaking 
            ? Math.max(0.12, mouth * (0.35 + 0.65 * Math.sin(time * 18 + index * 1.3)))
            : 0.08;
          node.scale.y = MathUtils.damp(node.scale.y, 0.25 + barOsc * 1.6, 22, dt);
        }
      }

      // EXPRESSIONS: Smooth morph target blending
      const targetExpr = EXPRESSIONS[expression] || EXPRESSIONS.HAPPY;

      for (const name of ALL_MORPH_NAMES) {
        const targetVal = targetExpr[name] !== undefined ? targetExpr[name] : 0;
        weights[name] = MathUtils.damp(weights[name], targetVal, 16, dt);
      }

      // Natural eye blinking
      if (time >= nextBlink) {
        blinkStart = time;
        nextBlink = time + 2.8 + Math.random() * 2.5;
      }
      const phase = (time - blinkStart) / 0.15;
      const blink = phase >= 0 && phase < 1 ? Math.pow(Math.sin(phase * Math.PI), 2) : 0;

      // Apply morph targets to face meshes
      for (const o of face) {
        if (!o || !o.morphTargetDictionary) continue;
        const isEye = o !== face[2];
        const sideBlink = overrides.get(o === face[0] ? 'BlinkLeft' : 'BlinkRight') || 0;
        const close = isEye ? Math.max(blink, overrides.get('Blink') || 0, sideBlink) : 0;

        for (const [name, index] of Object.entries(o.morphTargetDictionary)) {
          let value = overrides.has(name) ? overrides.get(name) : (weights[name] || 0);
          if (name === 'MouthOpen' && !overrides.has(name) && speaking) {
            value = Math.max(value, mouth);
          }
          if (isEye) {
            value = name === 'Blink' ? close : name.startsWith('Blink') ? 0 : value * (1 - close);
          }
          o.morphTargetInfluences[index] = clamp(value);
        }
      }

      // HEAD LOOK-AT & EXPRESSIVE TILT
      const tiltAngle = expression === 'THINKING' ? MathUtils.degToRad(8) : 0;
      const pitchOffset = expression === 'ANGRY' ? MathUtils.degToRad(5) : 0;

      yaw = MathUtils.damp(yaw, pointerX * MathUtils.degToRad(16), 14, dt);
      pitch = MathUtils.damp(pitch, -pointerY * MathUtils.degToRad(10), 14, dt);

      if (head && rest.has('Head')) {
        rotation.copy(rest.get('Head').q).invert().multiply(head.quaternion);
        euler.setFromQuaternion(rotation);
        euler.x = MathUtils.clamp(euler.x + pitch + pitchOffset, -MathUtils.degToRad(14), MathUtils.degToRad(14));
        euler.y = MathUtils.clamp(euler.y + yaw, -MathUtils.degToRad(18), MathUtils.degToRad(18));
        euler.z = MathUtils.clamp(euler.z + tiltAngle - pointerX * MathUtils.degToRad(4), -MathUtils.degToRad(10), MathUtils.degToRad(10));
        rotation.setFromEuler(euler);
        head.quaternion.copy(rest.get('Head').q).multiply(rotation);
      }

      // Body subtle playful jiggle
      if (body && rest.has('Body')) {
        const jiggleZ = Math.sin(time * 3.0) * MathUtils.degToRad(1.2);
        const jiggleX = Math.cos(time * 2.5) * MathUtils.degToRad(0.8);
        
        euler.set(jiggleX, 0, jiggleZ);
        rotation.setFromEuler(euler);
        body.quaternion.copy(rest.get('Body').q).multiply(rotation);
      }

      // Emissive lighting pulses & Angry red glow
      const isAngry = expression === 'ANGRY';
      const targetColor = isAngry ? angryGlowColor : defaultGlowColor;
      const pulse = 0.5 + 0.5 * Math.sin(time * 2.5);
      const glow = isAngry
        ? 5.0 + pulse * 2.0
        : speaking 
        ? 2.5 + mouth * 3.8 
        : state === 'LISTENING' 
        ? 4.0 
        : state === 'THINKING' 
        ? 1.4 + pulse * 2.4 
        : 1.4;

      if (materials.has('MAT_HeadphoneGlow')) {
        const mat = materials.get('MAT_HeadphoneGlow');
        mat.emissiveIntensity = glow;
        if (mat.emissive) mat.emissive.lerp(targetColor, 0.2);
      }
      if (materials.has('MAT_EyeGlow')) {
        const mat = materials.get('MAT_EyeGlow');
        if (mat.emissive) mat.emissive.lerp(targetColor, 0.2);
      }
      if (materials.has('MAT_MouthGlow')) {
        const mat = materials.get('MAT_MouthGlow');
        if (mat.emissive) mat.emissive.lerp(targetColor, 0.2);
      }
      if (materials.has('MAT_MicrophoneGlow')) {
        materials.get('MAT_MicrophoneGlow').emissiveIntensity = state === 'LISTENING' ? 4.5 : 1.5 + mouth * 2.8;
      }
      if (materials.has('MAT_AccentGlow')) {
        materials.get('MAT_AccentGlow').emissiveIntensity = 1.2 + (speaking ? mouth * 2.2 : pulse * 0.4);
      }
      if (materials.has('MAT_RingGlow')) {
        materials.get('MAT_RingGlow').emissiveIntensity = 1.6 + (state === 'IDLE' ? pulse * 0.4 : glow * 0.4);
      }
      if (materials.has('MAT_BaseGlow')) {
        materials.get('MAT_BaseGlow').emissiveIntensity = 0.9 + (speaking ? mouth * 1.6 : state === 'THINKING' ? pulse * 0.8 : 0.3 * pulse);
      }

      // Microphone subtle nod when speaking
      if (speaking && bones.has('Mic')) {
        bones.get('Mic').rotation.x += mouth * 0.018;
      }

      // Hover ring breathing
      if (ring && ringScale && ringRotation) {
        ring.scale.copy(ringScale).multiplyScalar(1 + 0.018 * Math.sin(time * 2));
        ring.quaternion.copy(ringRotation);
      }
    },
    dispose() {
      mixer.removeEventListener('finished', finished);
      mixer.stopAllAction();
      mixer.uncacheRoot(gltf.scene);
      for (const material of clonedMaterials.values()) {
        material.dispose();
      }
    },
  };
}
