import React, { useRef, useEffect, useState } from "react";
import "../styles/hero.css";

function ThreeDModel() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canvasOpacity, setCanvasOpacity] = useState(1);

  // Easing function for smoother progress
  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  // Preload images
  useEffect(() => {
    const totalFrames = 79;
    const loadedImages = new Array(totalFrames);

    const createPlaceholder = (width, height, frameNum) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#1a1a2e");
      gradient.addColorStop(1, "#16213e");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#66fcf1";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`Frame ${frameNum}`, width / 2, height / 2);

      const img = new Image();
      img.src = canvas.toDataURL();
      img.width = width;
      img.height = height;
      return img;
    };

    const loadImage = (index) => {
      return new Promise((resolve) => {
        const frameNumber = String(index).padStart(3, "0");
        const img = new Image();

        img.onload = () => {
          loadedImages[index - 1] = img;
          console.log(`✅ Loaded frame ${index}/${totalFrames}`);
          resolve(true);
        };

        img.onerror = () => {
          console.warn(`❌ Failed to load frame ${index}, using placeholder`);
          loadedImages[index - 1] = createPlaceholder(800, 600, index);
          resolve(false);
        };

        img.src = `/video-frames/frame_${String(frameNumber).padStart(4, '0')}.jpg`;

        console.log(`📄 Loading: ${img.src}`);
      });
    };

    const loadAllImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const loadPromises = [];
        for (let i = 1; i <= totalFrames; i++) {
          loadPromises.push(loadImage(i));
        }

        await Promise.all(loadPromises);
        setImages(loadedImages.filter((img) => img !== undefined));
        setIsLoading(false);
        console.log("🎬 All images processed");
      } catch (err) {
        setError("Failed to load images");
        setIsLoading(false);
        console.error("Error loading images:", err);
      }
    };

    loadAllImages();
  }, []);

  // Setup canvas and scroll handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth <= 768;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
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
    canvas.style.transition = "opacity 0.5s ease";

    const renderFrame = (frameIndex, progress = 0) => {
      if (images.length === 0) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        return;
      }

      const baseFrame = Math.floor(frameIndex);
      const nextFrame = Math.min(baseFrame + 1, images.length - 1);
      const img1 = images[baseFrame] || images[0];
      const img2 = images[nextFrame] || img1;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const canvasRatio = window.innerWidth / window.innerHeight;
      const imgRatio = img1.width / img1.height;

      let width, height, x, y;

      // MOBILE FIX: Use cover behavior to ensure full image is visible
      if (window.innerWidth <= 768) {
        // On mobile, cover the entire viewport
        if (imgRatio > canvasRatio) {
          // Image is wider - fit to height
          height = window.innerHeight;
          width = height * imgRatio;
          x = (window.innerWidth - width) / 2;
          y = 0;
        } else {
          // Image is taller - fit to width
          width = window.innerWidth;
          height = width / imgRatio;
          x = 0;
          y = (window.innerHeight - height) / 2;
        }
      } else {
        // Desktop behavior - same as before
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
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      if (progress > 0 && img1 !== img2) {
        ctx.globalAlpha = 1 - progress;
        ctx.drawImage(img1, x, y, width, height);
        ctx.globalAlpha = progress;
        ctx.drawImage(img2, x, y, width, height);
        ctx.globalAlpha = 1;
      } else {
        ctx.drawImage(img1, x, y, width, height);
      }
    };

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const heroSection = document.getElementById("hero");
      const aboutSection = document.getElementById("about");

      if (!heroSection || !aboutSection) return;

      const heroHeight = heroSection.offsetHeight;
      const heroTop = heroSection.offsetTop;
      const aboutTop = aboutSection.offsetTop;
      const aboutHeight = aboutSection.offsetHeight;

      const fadeStart = heroTop + heroHeight * 0.5;
      const fadeEnd = aboutTop + aboutHeight * 0.8;
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

        const frameIndex = Math.floor(progress * (images.length - 1));
        const subProgress = progress * (images.length - 1) - frameIndex;

        setCurrentFrame(frameIndex);
        renderFrame(frameIndex, subProgress);
      }

      canvas.style.opacity = opacity;
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    renderFrame(0);

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", () => {
      setCanvasSize();
      handleScroll();
    });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [images, currentFrame]);

  return (
    <div className="canvas-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-text">
              Loading 3D Animation... {images.filter((img) => img).length}/79
            </div>
            <div className="loading-bar">
              <div
                className="loading-progress"
                style={{
                  width: `${(images.filter((img) => img).length / 79) * 100}%`,
                }}
              ></div>
            </div>
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