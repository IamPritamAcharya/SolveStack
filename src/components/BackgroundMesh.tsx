import './BackgroundMesh.css';

/**
 * BackgroundMesh — pure CSS large blurred colour blobs.
 * No canvas, no JS animation loops. Uses CSS @keyframes only.
 * Inspired by Linear.app, Supabase, Vercel's dark mode backgrounds.
 */
export function BackgroundMesh() {
  return (
    <div className="bg-mesh" aria-hidden="true">
      <div className="bg-blob bg-blob--1" />
      <div className="bg-blob bg-blob--2" />
      <div className="bg-blob bg-blob--3" />
      <div className="bg-blob bg-blob--4" />
    </div>
  );
}
