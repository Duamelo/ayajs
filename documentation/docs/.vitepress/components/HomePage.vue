<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme'
import { teamMembers } from '../contributors'
</script>

<template>
  <div class="content">
    <div class="content-container">
      <main class="main">
        <div class="vp-doc" flex flex-col items-center mt-10>
          <div class="main-block">
            <hr class="hr"/>
            <p class="team"> <strong> Meet The Team. </strong></p>
            </div>
          <div w-full p-10>
            <VPTeamMembers size="small" :members="teamMembers" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
  .main-block{
      height:100px;
      width:80%;
      margin:0px auto;
    /*background:grey;*/
  }
  .team{
    text-align:center;
    color: #213547;
    font-size: 24px;
  }
  .hr{
    position: relative;
    width: 10%;
    color: #969696;
  }
</style>