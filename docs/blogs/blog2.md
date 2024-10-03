---
title: Blog 2
date: 10-03-2024
layout: doc
---

# Blog 2

I started working on a particle simulator, with the final goal of simulating basic molecules. So far I've implemented particles, charged particles, rendering, and some basic physics calculations using Couloumb's law. I knew the final product would have thousands of particles, so I started with a quadtree to store them instead of a list. I also made a basic profiler, but it sort of fails if there's too many particles due to the way I keep track of time spent by a certain task.

Most of the time spent by the program is in locating nearby charged particles. Even compressing the quadtree to reduce children uses a tiny amount of time, but so many comparisons for each charged particle takes forever. Currently the performance is pretty good after a few optimizations, but if I need to add significantly more particles I'll need to switch to something like a k-d tree or R-tree. 
