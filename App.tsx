import React, { useState, useCallback, useRef, useEffect } from 'react';
import Scene from './components/Scene';
import UIOverlay from './components/UIOverlay';
import GestureController from './components/GestureController';
import { AppMode, HandGestureState } from './types';
import { DEFAULT_PHOTOS } from './constants';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.TREE);
  const [gestureState, setGestureState] = useState<HandGestureState>({
    gesture: 'None',
    handPosition: { x: 0.5, y: 0.5, z: 0 },
    isDetected: false,
  });
  const [photos, setPhotos] = useState<string[]>(DEFAULT_PHOTOS);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastGestureRef = useRef<string>('None');

  const handleGestureUpdate = useCallback((state: HandGestureState) => {
    // Only update state if something actually changed to save renders
    // Relaxed threshold to 0.005 to reduce render frequency
    setGestureState(prev => {
        if (prev.gesture === state.gesture && 
            prev.isDetected === state.isDetected && 
            Math.abs(prev.handPosition.x - state.handPosition.x) < 0.005) {
            return prev;
        }
        return state;
    });

    // Detect Pinch Rising Edge (Start of Pinch) to cycle photos
    // "Pinch" gesture usually triggers FOCUS mode, but we also want to step the index.
    if (state.gesture === 'Pinch' && lastGestureRef.current !== 'Pinch') {
      if (photos.length > 0) {
          setActivePhotoIndex(prev => (prev + 1) % photos.length);
      }
    }
    
    lastGestureRef.current = state.gesture;
  }, [photos.length]);

  const handleModeChange = useCallback((newMode: AppMode) => {
    setMode((prev) => {
      if (prev === newMode) return prev;
      return newMode;
    });
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const MAX_PHOTOS = 30;
      const remainingSlots = MAX_PHOTOS - photos.length;
      
      if (remainingSlots <= 0) {
        alert("Maximum 30 photos limit reached.");
        return;
      }

      const filesToAdd = Array.from(e.target.files).slice(0, remainingSlots);
      
      if (e.target.files.length > remainingSlots) {
         alert(`Limit is 30 photos. Only adding the first ${remainingSlots} images.`);
      }

      const newUrls = filesToAdd.map((file) => URL.createObjectURL(file as Blob));
      setPhotos(prev => [...prev, ...newUrls]);
    }
  };

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const url = URL.createObjectURL(e.target.files[0]);
        setMusicUrl(url);
    }
  };

  // Auto-play music when URL changes
  useEffect(() => {
      if (musicUrl && audioRef.current) {
          audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
  }, [musicUrl]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Music Player */}
      <audio ref={audioRef} src={musicUrl || undefined} loop />

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Scene 
            mode={mode} 
            gestureState={gestureState} 
            photos={photos}
            activePhotoIndex={activePhotoIndex}
        />
      </div>

      {/* UI & HUD */}
      <UIOverlay 
        mode={mode} 
        gestureState={gestureState} 
        onPhotoUpload={handlePhotoUpload}
        onMusicUpload={handleMusicUpload}
      />

      {/* Invisible Logic Layer */}
      <GestureController 
        onUpdate={handleGestureUpdate} 
        onModeChange={handleModeChange} 
      />
    </div>
  );
};

export default App;