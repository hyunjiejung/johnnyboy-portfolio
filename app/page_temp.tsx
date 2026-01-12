"use client";

import Gallery from "@/components/Gallery";
import { fetchArtworks, Artwork } from "@/lib/notion";
import { MoveDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Client component wrapper for home page logic since we need animations
// But fetchArtworks is server-side. We should split this or pass data.
// Since we are moving to "Premium" feel, let's make the Page a server component 
// that passes data to a Client Hero component. 
// BUT, for simplicity in this file replacement, I'll keep it simple:
// We will convert this file to a Client Component for the Hero animation, 
// AND we will fetch data in a separate server component or just pass it down?
// Actually, let's make this page a Server Component that renders a Client Hero.

// To do this cleanly without creating too many new files, I'll create the Hero component inline here
// or better yet, I should have created a separate component. 
// But per instructions I need to modify app/page.tsx.

// Let's refactor app/page.tsx to be a Server Component that imports a new Hero component? 
// Or just use the existing structure if possible.
// Wait, 'framer-motion' needs 'use client'. 
// So I will create a new component `components/Hero.tsx` and use it in `app/page.tsx`.
// This is cleaner.

export default function Home_Placeholder() { return null; }
