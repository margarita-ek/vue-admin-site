<template>
  <div class="wrapper">
    <div class="loader"></div>
  </div>
</template>

<style setup>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 30000;
}

.loader {
    font-size: 10px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    text-indent: -9999em;
    animation: mulShdSpin 1.1s infinite ease;
    transform: translateZ(0);
}
@keyframes mulShdSpin {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #f4831d, 1.8em -1.8em 0 0em rgba(244,131,39, 0.2), 2.5em 0em 0 0em rgba(244,131,39, 0.2), 1.75em 1.75em 0 0em rgba(244,131,39, 0.2), 0em 2.5em 0 0em rgba(244,131,39, 0.2), -1.8em 1.8em 0 0em rgba(244,131,39, 0.2), -2.6em 0em 0 0em rgba(244,131,39, 0.5), -1.8em -1.8em 0 0em rgba(244,131,39, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(244,131,39, 0.7), 1.8em -1.8em 0 0em rgb(244, 131, 29), 2.5em 0em 0 0em rgba(244,131,39, 0.2), 1.75em 1.75em 0 0em rgba(244,131,39, 0.2), 0em 2.5em 0 0em rgba(244,131,39, 0.2), -1.8em 1.8em 0 0em rgba(244,131,39, 0.2), -2.6em 0em 0 0em rgba(244,131,39, 0.2), -1.8em -1.8em 0 0em rgba(244,131,39, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(244,131,39, 0.5), 1.8em -1.8em 0 0em rgba(244,131,39, 0.7), 2.5em 0em 0 0em #f4831d, 1.75em 1.75em 0 0em rgba(244,131,39, 0.2), 0em 2.5em 0 0em rgba(244,131,39, 0.2), -1.8em 1.8em 0 0em rgba(244,131,39, 0.2), -2.6em 0em 0 0em rgba(244,131,39, 0.2), -1.8em -1.8em 0 0em rgba(244,131,39, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(244,131,39, 0.2), 1.8em -1.8em 0 0em rgba(244,131,39, 0.5), 2.5em 0em 0 0em rgba(244,131,39, 0.7), 1.75em 1.75em 0 0em #f4831d, 0em 2.5em 0 0em rgba(244,131,39, 0.2), -1.8em 1.8em 0 0em rgba(244,131,39, 0.2), -2.6em 0em 0 0em rgba(244,131,39, 0.2), -1.8em -1.8em 0 0em rgba(244,131,39, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(244,131,39, 0.2), 1.8em -1.8em 0 0em rgba(244,131,39, 0.2), 2.5em 0em 0 0em rgba(244,131,39, 0.5), 1.75em 1.75em 0 0em rgba(244,131,39, 0.7), 0em 2.5em 0 0em #f4831d, -1.8em 1.8em 0 0em rgba(244,131,39, 0.2), -2.6em 0em 0 0em rgba(244,131,39, 0.2), -1.8em -1.8em 0 0em rgba(244,131,39, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(244,131,39, 0.2), 1.8em -1.8em 0 0em rgba(244,131,39, 0.2), 2.5em 0em 0 0em rgba(244,131,39, 0.2), 1.75em 1.75em 0 0em rgba(244,131,39, 0.5), 0em 2.5em 0 0em rgba(244,131,39, 0.7), -1.8em 1.8em 0 0em #f4831d, -2.6em 0em 0 0em rgba(244,131,39, 0.2), -1.8em -1.8em 0 0em rgba(244,131,39, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(244,131,39, 0.2), 1.8em -1.8em 0 0em rgba(244,131,39, 0.2), 2.5em 0em 0 0em rgba(244,131,39, 0.2), 1.75em 1.75em 0 0em rgba(244,131,39, 0.2), 0em 2.5em 0 0em rgba(244,131,39, 0.5), -1.8em 1.8em 0 0em rgba(244,131,39, 0.7), -2.6em 0em 0 0em #f4831d, -1.8em -1.8em 0 0em rgba(244,131,39, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(244,131,39, 0.2), 1.8em -1.8em 0 0em rgba(244,131,39, 0.2), 2.5em 0em 0 0em rgba(244,131,39, 0.2), 1.75em 1.75em 0 0em rgba(244,131,39, 0.2), 0em 2.5em 0 0em rgba(244,131,39, 0.2), -1.8em 1.8em 0 0em rgba(244,131,39, 0.5), -2.6em 0em 0 0em rgba(244,131,39, 0.7), -1.8em -1.8em 0 0em #f4831d;
  }
}
</style>