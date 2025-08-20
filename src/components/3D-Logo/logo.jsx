import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Logo3D = ({ 
  spinSpeedMultiplier = 1, 
  radius = 1, 
  size = 512, 
  className = '',
}) => {
  const containerRef = useRef(null);
  const logoInstanceRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    class Logo3DInstance {
      constructor(spinSpeedMultiplier = 1, radius = 1) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({ 
          antialias: true, 
          powerPreference: 'low-power',
          alpha: true 
        });
        renderer.setSize(size, size);
        renderer.setClearColor(0x000000, 0);

        const detail = 2;
        let velocityBase = [0, 0.0005, 0];
        let velocityMouse = [0, 0, 0];
        let mousePressed = false;

        const canvas = renderer.domElement;
        const globalX = new THREE.Vector3(1, 0, 0).normalize();
        const globalY = new THREE.Vector3(0, 1, 0).normalize();
        const globalZ = new THREE.Vector3(0, 0, 1).normalize();

        const meshGeometry = new THREE.IcosahedronGeometry(radius, detail);
        const lineGeometry = new THREE.IcosahedronGeometry(radius + 0.001, detail);

        const meshMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x000000, 
          transparent: true, 
          opacity: 0 
        });
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0x00d4ff, 
          transparent: true 
        });

        const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
        const line = new THREE.LineSegments(
          new THREE.EdgesGeometry(lineGeometry), 
          lineMaterial
        );

        mesh.renderOrder = -1;

        const group = new THREE.Group();
        group.add(mesh);
        group.add(line);
        group.rotateX(Math.PI / 4);
        group.rotateZ(Math.PI / 4);

        scene.add(group);
        camera.position.z = 2;

        const handleMouseDown = () => mousePressed = true;
        const handleMouseUp = () => mousePressed = false;
        const handleMouseOut = () => mousePressed = false;

        const handleMouseMove = (ev) => {
          if (mousePressed) {
            velocityMouse[1] = ev.movementX * 0.0005 * spinSpeedMultiplier;
            velocityMouse[0] = ev.movementY * 0.0005 * spinSpeedMultiplier;
          }
        };

        const handleTouchStart = () => mousePressed = true;
        const handleTouchEnd = () => mousePressed = false;

        let lastTouch = null;
        const handleTouchMove = (ev) => {
          if (mousePressed) {
            const movementX = lastTouch ? ev.touches[0].pageX - lastTouch[0] : 0;
            const movementY = lastTouch ? ev.touches[0].pageY - lastTouch[1] : 0;

            velocityMouse[1] = movementX * 0.0005 * spinSpeedMultiplier;
            velocityMouse[0] = movementY * 0.0005 * spinSpeedMultiplier;
            
            lastTouch = [ev.touches[0].pageX, ev.touches[0].pageY];
          }
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseout', handleMouseOut);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
        canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

        let last = 0;
        let deltaTime = 0.016;
        let animationId;
        
        const animate = (time) => {
          deltaTime = (time - last) ? (time - last) : deltaTime;
          last = time;

          velocityMouse[0] /= 1.1;
          velocityMouse[1] /= 1.1;
          velocityMouse[2] /= 1.1;

          group.rotateOnWorldAxis(globalX, (velocityBase[0] + velocityMouse[0]) * deltaTime);
          group.rotateOnWorldAxis(globalY, (velocityBase[1] + velocityMouse[1]) * deltaTime);
          group.rotateOnWorldAxis(globalZ, (velocityBase[2] + velocityMouse[2]) * deltaTime);

          animationId = requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };

        animate();

        this.renderer = renderer;
        this.canvas = canvas;
        this.animationId = animationId;
        
        this.dispose = () => {
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
          
          canvas.removeEventListener('mousedown', handleMouseDown);
          canvas.removeEventListener('mouseup', handleMouseUp);
          canvas.removeEventListener('mouseout', handleMouseOut);
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('touchstart', handleTouchStart);
          canvas.removeEventListener('touchend', handleTouchEnd);
          canvas.removeEventListener('touchmove', handleTouchMove);
          
          meshGeometry.dispose();
          lineGeometry.dispose();
          meshMaterial.dispose();
          lineMaterial.dispose();
          renderer.dispose();
          
          if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        };
      }

      attachLogoTo(parent) {
        const getSize = (width, height) => Math.min(width, height);
        
        let currentSize = getSize(parent.clientWidth, parent.clientHeight);
        this.renderer.setSize(currentSize, currentSize);

        const observerCallback = (entries) => {
          window.requestAnimationFrame(() => {
            if (!Array.isArray(entries) || !entries.length) return;
            let newSize = getSize(parent.clientWidth, parent.clientHeight);
            this.renderer.setSize(newSize, newSize);
          });
        };

        const resizeObserver = new ResizeObserver(observerCallback);
        resizeObserver.observe(parent);

        parent.appendChild(this.renderer.domElement);
        this.renderer.domElement.classList.add('aspect-square');
        
        this.resizeObserver = resizeObserver;
        
        const originalDispose = this.dispose;
        this.dispose = () => {
          if (this.resizeObserver) {
            this.resizeObserver.disconnect();
          }
          originalDispose();
        };
      }
    }

    const logoInstance = new Logo3DInstance(spinSpeedMultiplier, radius);
    logoInstance.attachLogoTo(containerRef.current);
    logoInstanceRef.current = logoInstance;

    return () => {
      if (logoInstanceRef.current) {
        logoInstanceRef.current.dispose();
      }
    };
  }, [spinSpeedMultiplier, radius, size]);



  return (
    <div className={`relative ${className}`}>
      <div 
        ref={containerRef}
        className={`
          w-full h-full flex items-center justify-center
          ${window?.innerWidth > 768 ? 'z-20' : '-z-20'}
        `}
        style={{ minHeight: size, minWidth: size }}
      />
    </div>
  );
};

export default Logo3D;