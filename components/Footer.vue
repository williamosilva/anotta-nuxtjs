<template>
  <footer class="bg-gray-100 py-6 mt-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-center space-x-6">
        <a
          href="https://github.com/WilliamSilvaOliveiraa"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-gray-900 transition-colors duration-300"
        >
          <GithubIcon class="w-6 h-6" />
          <span class="sr-only">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/williamsilva2005/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-gray-900 transition-colors duration-300"
        >
          <LinkedinIcon class="w-6 h-6" />
          <span class="sr-only">LinkedIn</span>
        </a>
        <a
          href="https://williamsilva.dev"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-gray-900 transition-colors duration-300"
        >
          <GlobeIcon class="w-6 h-6" />
          <span class="sr-only">Website</span>
        </a>
      </div>
      <div class="mt-4 text-center text-sm text-gray-500">
        © {{ new Date().getFullYear() }} William Silva. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { GithubIcon, LinkedinIcon, GlobeIcon } from "lucide-vue-next";
</script>
