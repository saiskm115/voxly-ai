import React, { useEffect, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MathUtils } from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { createVoxlyController } from './BotController';

const GLB_URL = '/models/VoxlyBot_AIEmployee_Interactive.glb';

export function VoxlyBot({
  state = 'IDLE',
  expression = null,
  onBotClick,
  onControllerReady,
  onExpressionChange,
  pointer = { x: 0, y: 0 },
  audioAnalyser = null,
  audioAmplitude = 0,
}) {
  const gltf = useGLTF(GLB_URL);
  const { size } = useThree();
  const groupRef = useRef();
  const bodyYawRef = useRef(0);
  const bodyPitchRef = useRef(0);

  // Clone scene with skeletons preserved
  const clonedScene = useMemo(() => {
    return {
      scene: SkeletonUtils.clone(gltf.scene),
      animations: gltf.animations,
    };
  }, [gltf.scene, gltf.animations]);

  // Persistent controller instance
  const controller = useMemo(() => {
    return createVoxlyController(clonedScene, {
      onExpressionChange: (expr) => {
        if (onExpressionChange) onExpressionChange(expr);
      },
    });
  }, [clonedScene, onExpressionChange]);

  // Inform parent when controller is ready
  useEffect(() => {
    if (controller && onControllerReady) {
      onControllerReady(controller);
    }
  }, [controller, onControllerReady]);

  // Sync state changes
  useEffect(() => {
    if (controller && state) {
      controller.setState(state);
    }
  }, [controller, state]);

  // Sync expression changes without circular triggers
  useEffect(() => {
    if (controller && expression && controller.expression !== expression) {
      controller.setExpression(expression);
    }
  }, [controller, expression]);

  // Sync audio analyser
  useEffect(() => {
    if (controller) {
      controller.attachAnalyser(audioAnalyser);
    }
  }, [controller, audioAnalyser]);

  // Sync direct audio amplitude
  useEffect(() => {
    if (controller && audioAmplitude !== undefined) {
      controller.setAudioAmplitude(audioAmplitude);
    }
  }, [controller, audioAmplitude]);

  // Frame update: body follows mouse cursor up to 120 degrees with floating and jiggle
  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();

    // Responsive horizontal offset & vertical clearance:
    // Desktop: Shift robot slightly to left (-0.22) so top-right dialogue box has clean gap without touching.
    // Mobile: Center robot, scale down slightly (0.38), and lower position so dialogue box sits cleanly in top-right without overlap.
    const isDesktop = size.width >= 960;
    const isTablet = size.width >= 640 && size.width < 960;
    const targetX = isDesktop ? -0.22 : isTablet ? -0.15 : 0;
    const basePosY = size.width < 640 ? -1.02 : -0.95;
    const baseScale = size.width < 480 ? 0.38 : size.width < 640 ? 0.40 : 0.42;

    // 120 DEGREES TOTAL BODY ROTATION RANGE (-60 deg to +60 deg)
    const targetBodyYaw = MathUtils.clamp(pointer.x, -1, 1) * MathUtils.degToRad(60);
    const targetBodyPitch = MathUtils.clamp(-pointer.y, -1, 1) * MathUtils.degToRad(14);

    bodyYawRef.current = MathUtils.damp(bodyYawRef.current, targetBodyYaw, 8, delta);
    bodyPitchRef.current = MathUtils.damp(bodyPitchRef.current, targetBodyPitch, 8, delta);

    const rollProg = controller?.rollProgress || 0;
    // True smooth 360-degree acrobatic spin roll (0 to 2*PI continuous ease)
    const rollEase = rollProg > 0 ? (1 - Math.cos(rollProg * Math.PI)) * 0.5 : 0;
    const rollAngle = rollEase * Math.PI * 2;
    const rollHop = Math.sin(rollProg * Math.PI) * 0.32;
    const rollTilt = Math.sin(rollProg * Math.PI * 2) * 0.22;

    if (groupRef.current) {
      // Smoothly interpolate X offset and apply responsive scale
      groupRef.current.position.x = MathUtils.damp(groupRef.current.position.x, targetX, 6, delta);
      // Floating hover motion with celebratory roll hop
      groupRef.current.position.y = basePosY + Math.sin(time * 2.4) * 0.06 + rollHop;
      groupRef.current.scale.setScalar(baseScale);
      // 120-degree body rotation following cursor + lively jiggle + 360 roll
      groupRef.current.rotation.y = bodyYawRef.current + Math.sin(time * 1.5) * 0.02 + rollAngle;
      groupRef.current.rotation.x = bodyPitchRef.current;
      groupRef.current.rotation.z = Math.sin(time * 3.0) * 0.012 - MathUtils.clamp(pointer.x, -1, 1) * MathUtils.degToRad(3) + rollTilt;
    }

    if (controller) {
      controller.setPointer(pointer.x, pointer.y);
      controller.update(delta);
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (controller) {
        controller.dispose();
      }
    };
  }, [controller]);

  return (
    <group
      ref={groupRef}
      position={[0, -0.95, 0]}
      scale={[0.42, 0.42, 0.42]}
      onClick={(e) => {
        e.stopPropagation();
        if (onBotClick) onBotClick();
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      <primitive object={clonedScene.scene} />
    </group>
  );
}

useGLTF.preload(GLB_URL);
