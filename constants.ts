import { Color } from 'three';

export const COLORS = {
  EMERALD_DEEP: new Color('#004225'),
  EMERALD_LIGHT: new Color('#026a3b'),
  GOLD_METALLIC: new Color('#FFD700'), // Tycoon Gold
  GOLD_RICH: new Color('#D4AF37'), // Darker real gold
  RIBBON_RED: new Color('#C41E3A'), // Cardinal Red
  RIBBON_PINK: new Color('#FFB7C5'), // Sakura/Baby Pink for lightweight feel
  SNOW_WHITE: new Color('#FFFFFF'),
  SILVER_METALLIC: new Color('#C0C0C0'),
  WHITE_GLOW: new Color('#FFFFFF'),
};

export const CONFIG = {
  // Adjusted to 1500 as requested for "smaller and more" (relative to original concept) 
  // while maintaining performance
  PARTICLE_COUNT: 1500,
  INNER_PARTICLE_COUNT: 400, // New internal particles
  RIBBON_PARTICLE_COUNT: 2000, // New ribbon particles
  ORNAMENT_COUNT: 100,
  GIFT_COUNT: 25,
  TREE_HEIGHT: 14,
  TREE_RADIUS: 5,
  SCATTER_RADIUS: 30,
  TRANSITION_SPEED: 2.0,
};

export const DEFAULT_PHOTOS = [
  'https://picsum.photos/id/1011/300/300',
  'https://picsum.photos/id/1012/300/300',
  'https://picsum.photos/id/1025/300/300',
  'https://picsum.photos/id/106/300/300',
];