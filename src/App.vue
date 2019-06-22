<template>
  <div id="app">
    <div class="container-fluid">
      <header class="bp-header cf">
        <div class="dummy-logo">
          <div class="dummy-icon foodicon foodicon--coconut"></div>
          <h2 class="dummy-heading">PLOTCOST</h2>
        </div>
      </header>
      <Sidebar/>
      <Details/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Details from "@/components/Details.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "app",
  components: {
    Sidebar,
    Details,
    Footer
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');


body {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  color: #cecece;
  background: #2a2b30 !important;
  -webkit-font-smoothing: antialiased;
}

.container {
  overflow-y: auto;
  height: 100vh;
}

.bp-header {
  display: -webkit-flex;
  display: flex;
}

.cf:before,
.cf:after {
  content: " ";
  display: table;
}

.dummy-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 120px;
  padding: 1em 0 0 0;
  text-align: center;
  color: #3b3d4a;
  background: #1c1d22;
}

.dummy-icon {
  font-size: 4em;
}

.dummy-heading {
  font-size: 0.75em;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.bp-header__main {
  margin: 0 0 0 auto;
  padding: 2em 3em 0;
  text-align: right;
}

.menu {
  position: fixed;
  top: 50px;
  left: 0;
  width: 250px;
  height: 100vh;
  background: #1c1d22;
}

.menu__wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
}

.menu__wrap:hover {
  overflow-y: auto;
}

.content {
  position: relative;
  min-height: 550px;
  margin: 0 0 0 250px;
  padding: 15px;
}

html {
  scrollbar-face-color: #646464;
  scrollbar-base-color: #646464;
  scrollbar-3dlight-color: #646464;
  scrollbar-highlight-color: #646464;
  scrollbar-shadow-color: #646464;
}

::-webkit-scrollbar {
  width: 8px;
  height: 3px;
}
::-webkit-scrollbar-button {
  background-color: #646464;
}
::-webkit-scrollbar-track {
  background-color: #646464;
}
::-webkit-scrollbar-track-piece {
  background-color: #2a2b30;
}
::-webkit-scrollbar-thumb {
  height: 50px;
  background-color: #646464;
  border-radius: 3px;
}
::-webkit-scrollbar-corner {
  background-color: #646464;
}
::-webkit-resizer {
  background-color: #646464;
}
</style>
