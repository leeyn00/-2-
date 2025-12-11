import { Vector3 } from 'three';

export enum AppMode {
  TREE = 'TREE',
  SCATTERED = 'SCATTERED',
  FOCUS = 'FOCUS', // Brought close to camera
}

export interface TreeElementData {
  id: number;
  scatterPos: Vector3;
  treePos: Vector3;
  rotation: Vector3;
  scale: number;
  type: 'SPHERE' | 'ORNAMENT' | 'GIFT' | 'PHOTO' | 'INNER';
  textureUrl?: string;
  color?: string; // Hex string or predefined
}

export interface HandGestureState {
  gesture: 'None' | 'Closed_Fist' | 'Open_Palm' | 'Victory' | 'Thumb_Up' | 'Pinch';
  handPosition: { x: number; y: number; z: number };
  isDetected: boolean;
}

export interface PhotoData {
  id: string;
  url: string;
}