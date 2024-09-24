---
layout: doc
---

<script setup>
  import {data as assignments} from './legacy/assignments/assignments.data';
  import {data as projects} from './legacy/projects/projects.data';
  import { withBase } from 'vitepress';
</script>

# 6.1040 Stuff

## Assignments

<ul v-if="assignments.length > 0">
  <li v-for="assignment of assignments">
    <a :href="withBase(assignment.url)">{{ assignment.frontmatter.title }}</a>
  </li>
</ul>
<p v-else>
  Nothing here yet!
</p>

## Project

<ul v-if="projects.length > 0">
  <li v-for="project of projects">
    <a :href="withBase(project.url)">{{ project.frontmatter.title }}</a>
  </li>
</ul>
<p v-else>
  Nothing here yet!
</p>
