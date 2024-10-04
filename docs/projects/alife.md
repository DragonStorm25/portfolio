---
title: "ALife: A Particle-Based Artificial Life Simulation"
layout: doc
---

# {{ $frontmatter.title }}

## Goal

To create a particle simulation that runs on a modified version of physics and chemistry, with some inspiration taken from real life, than can model analogues to real life organic compounds, like phospholipids and amino acids. 

## Requirements

### Particles

ALife currently has both neutral and charged particles. It will also have bonding behavior between various atomic particles, resulting in molecules formed of these atoms.

### Physics

ALife currently has a physics engine that calculates the forces between charged particles using [Coulomb's law](https://en.wikipedia.org/wiki/Coulomb's_law#Mathematical_form) and applies those forces over some timestep using the [Runge-Kutta method](https://en.wikipedia.org/wiki/Runge–Kutta_methods). The interaction range between particles is also dynamic; strongly charged particles will apply forces over a larger range until the force is considered small enough to be negligible. 

### Optimizations

#### Particle Interactions
To find out the strength of two particles interacting, we must first find if the two particles are close enough to interact meaningfully. The naive method for this is for each particle, we check if it's close to every other particle. However, this is a quadratic algorithm and slows down when we want to simulate thousands or tens of thousands of particles. 

We want to increase the speed of finding neighbors of any particle in a given range, so we can store the particles in a [quadtree](https://en.wikipedia.org/wiki/Quadtree). This allows us to partition our search area depending on the range. Given some range value, we can find all quadtrees that intersect the  bounding box that inscribes our circular range. Then, we only have to search those quadtrees. This also applies to any quadtrees we would search recursively. Instead of searching through a list of all particles, we only search through the particles in nearby quadtrees that are within our bounding box. Then, we can simply check this (usually) much smaller list to see if any particles are within range. I found this algorithm from [this](https://stackoverflow.com/questions/6698484/using-a-quadtree-to-get-all-points-within-a-bounding-circle) StackOverflow post. 

On the average case, this is significantly better than the naive approach. Since we can use the partitions of the quadtree to our advantage, we can cut the search area in half (on average) on every step. This gives us the following table:

| Approach | Time complexity (worst case) | Time complexity (average case) |
| ---- | ---- | ---- | 
| Naive (checking all pairs) | $O(n^2)$ | $O(n^2)$ |
| Quadtree | $O(n^2)$ | $O(n \log n)$ |

Unfortunately, if the quadtree is poorly built or points are particularly clustered, we will still have to check many point. 

#### Rebuilding Quadtree