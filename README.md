# AUREON — Engineered for Immersion

Premium luxury audio site with interactive GLB product experiences (React Three Fiber + GSAP ScrollTrigger).

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then:

- Home: headphones scroll-orbit, then earbuds turntable
- [http://localhost:3000/headphones](http://localhost:3000/headphones)
- [http://localhost:3000/earbuds](http://localhost:3000/earbuds)

## Required 3D files

Place real GLB models here (they are not included):

- `public/models/aureon-headphones.glb`
- `public
Until those files exist, each canvas shows a precise fallback with the expected path. No fake 3D substitutes are rendered.
