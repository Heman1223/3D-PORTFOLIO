import React, { useRef, useEffect, useState } from "react";
import "../styles/hero.css";

function ThreeDModel() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canvasOpacity, setCanvasOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Device detection - SUPER OPTIMIZED FOR MOBILE
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Detect low-end devices (older phones, less RAM)
      const isLowEnd =
        mobile &&
        (window.devicePixelRatio > 2 || // High DPI but might be low performance
          !window.matchMedia("(min-resolution: 2dppx)").matches || // Low resolution screen
          navigator.hardwareConcurrency < 4 || // Less than 4 CPU cores
          navigator.deviceMemory < 4); // Less than 4GB RAM
      setIsLowEndDevice(isLowEnd);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Easing function for smoother progress
  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  // Preload images - EXTREME MOBILE OPTIMIZATION
  useEffect(() => {
    // DRAMATICALLY REDUCE FRAMES FOR MOBILE
    let totalFrames;
    if (isLowEndDevice) {
      totalFrames = 20; // Very few frames for low-end devices
    } else if (isMobile) {
      totalFrames = 30; // Reduced frames for regular mobile
    } else {
      totalFrames = 79; // Full frames for desktop
    }

    const loadedImages = new Array(totalFrames);

    const createPlaceholder = (width, height, frameNum) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      // Simple gradient - less processing
      ctx.fillStyle = "#0f1419";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#4a90e2";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${frameNum}`, width / 2, height / 2);

      const img = new Image();
      img.src = canvas.toDataURL();
      return img;
    };

    const loadImage = (index) => {
      return new Promise((resolve) => {
        const frameNumber = String(index).padStart(3, "0");
        const img = new Image();

        img.onload = () => {
          loadedImages[index - 1] = img;
          setLoadingProgress(Math.floor((index / totalFrames) * 100));
          resolve(true);
        };

        img.onerror = () => {
          console.warn(`Failed to load frame ${index}, using placeholder`);
          // Much smaller placeholders for mobile
          const width = isMobile ? 320 : 800;
          const height = isMobile ? 240 : 600;
          loadedImages[index - 1] = createPlaceholder(width, height, index);
          setLoadingProgress(Math.floor((index / totalFrames) * 100));
          resolve(false);
        };

        // Use optimized frame paths
        let imagePath;
        if (isLowEndDevice) {
          imagePath = `/video-frames/mobile-low/frame_${String(
            frameNumber
          ).padStart(4, "0")}.jpg`;
        } else if (isMobile) {
          imagePath = `/video-frames/mobile/frame_${String(
            frameNumber
          ).padStart(4, "0")}.jpg`;
        } else {
          imagePath = `/video-frames/frame_${String(frameNumber).padStart(
            4,
            "0"
          )}.jpg`;
        }

        img.src = imagePath;
      });
    };

    const loadAllImages = async () => {
      setIsLoading(true);
      setError(null);
      setLoadingProgress(0);

      try {
        // Load in batches for better performance
        const batchSize = isMobile ? 5 : 10;
        for (let i = 1; i <= totalFrames; i += batchSize) {
          const batchPromises = [];
          for (let j = i; j < Math.min(i + batchSize, totalFrames + 1); j++) {
            batchPromises.push(loadImage(j));
          }
          await Promise.all(batchPromises);

          // Small delay between batches to prevent blocking
          if (isMobile) {
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
        }

        setImages(loadedImages.filter((img) => img !== undefined));
        setIsLoading(false);
        setLoadingProgress(100);
      } catch (err) {
        setError("Failed to load images");
        setIsLoading(false);
        console.error("Error loading images:", err);
      }
    };

    loadAllImages();
  }, [isMobile, isLowEndDevice]);

  // Setup canvas and scroll handling - SUPER SMOOTH MOBILE
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let lastScrollTime = 0;
    const scrollThrottle = isMobile ? 32 : 16; // 30fps on mobile, 60fps on desktop

    const setCanvasSize = () => {
      const dpr = isMobile ? 1 : Math.min(2, window.devicePixelRatio || 1); // Limit DPR for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "1";
    canvas.style.pointerEvents = "none";

    const renderFrame = (frameIndex) => {
      if (images.length === 0) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        return;
      }

      const actualFrameIndex = Math.min(
        Math.floor(frameIndex),
        images.length - 1
      );
      const img = images[actualFrameIndex] || images[0];

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const canvasRatio = window.innerWidth / window.innerHeight;
      const imgRatio = img.width / img.height;

      let width, height, x, y;

      // ULTRA SIMPLE RENDERING FOR MOBILE
      if (isMobile) {
        // Always use cover behavior - simplest calculation
        if (imgRatio > canvasRatio) {
          width = window.innerWidth;
          height = width / imgRatio;
          x = 0;
          y = (window.innerHeight - height) / 2;
        } else {
          height = window.innerHeight;
          width = height * imgRatio;
          x = (window.innerWidth - width) / 2;
          y = 0;
        }

        // DISABLE all image smoothing for maximum mobile performance
        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
      } else {
        // Desktop rendering with optimizations
        if (imgRatio > canvasRatio) {
          width = window.innerWidth;
          height = width / imgRatio;
          x = 0;
          y = (window.innerHeight - height) / 2;
        } else {
          height = window.innerHeight;
          width = height * imgRatio;
          x = (window.innerWidth - width) / 2;
          y = 0;
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "medium"; // Not high for performance
      }

      ctx.drawImage(img, x, y, width, height);
    };

    const handleScroll = () => {
      const currentTime = Date.now();
      if (currentTime - lastScrollTime < scrollThrottle) {
        return; // Throttle scroll events
      }
      lastScrollTime = currentTime;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const heroSection = document.getElementById("hero");
      const aboutSection = document.getElementById("about");

      if (!heroSection || !aboutSection) return;

      const heroHeight = heroSection.offsetHeight;
      const heroTop = heroSection.offsetTop;
      const aboutTop = aboutSection.offsetTop;

      // Simplified fade calculation
      const fadeStart = heroTop + heroHeight * 0.3;
      const fadeEnd = aboutTop + 200;
      const fadeDistance = fadeEnd - fadeStart;

      let opacity = 1;
      if (scrollTop > fadeStart) {
        opacity = Math.max(0, 1 - (scrollTop - fadeStart) / fadeDistance);
        setCanvasOpacity(opacity);
      } else {
        setCanvasOpacity(1);
      }

      if (scrollTop < aboutTop) {
        const maxScroll = Math.max(0, aboutTop - heroTop);
        let progress = 0;
        if (maxScroll > 0) {
          progress = Math.min(
            1,
            Math.max(0, (scrollTop - heroTop) / maxScroll)
          );
          progress = easeInOutQuad(progress);
        }

        const frameIndex = progress * (images.length - 1);
        setCurrentFrame(frameIndex);

        // Use requestAnimationFrame for smooth rendering
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = requestAnimationFrame(() => {
          renderFrame(frameIndex);
        });
      }

      canvas.style.opacity = opacity;
    };

    // Passive scroll listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", setCanvasSize);

    // Initial render
    renderFrame(0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setCanvasSize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [images, isMobile]);

  return (
    <div className="canvas-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-text">
              {isLowEndDevice
                ? "🔄 Lite Mode"
                : isMobile
                ? "📱 Mobile Optimized"
                : "💻 Loading"}
              ... {loadingProgress}%
            </div>
            <div className="loading-bar">
              <div
                className="loading-progress"
                style={{
                  width: `${loadingProgress}%`,
                }}
              ></div>
            </div>
            {isLowEndDevice && (
              <div className="loading-info">
                Using performance mode for smooth experience
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="error-overlay">
          <div className="error-text">{error}</div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="three-d-canvas"
        style={{ opacity: canvasOpacity }}
      />
    </div>
  );
}

export default ThreeDModel;
