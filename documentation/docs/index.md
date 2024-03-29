---
layout: home
title: ayajs
titleTemplate: A flexible JavaScript library for building any kind of diagrams quickly and in a programmatic way

hero:
  # name: ayajs
  text: The fastest way to build diagram in a programmatic way.
  tagline: Simple, powerful and flexible. Meet the JavaScript library you've always needed.
  # image:
  #   src: /logo_aya.png
  #   alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: ../guide/get-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Duamelo/ayajs
features:
  - title:  "➕ Designed to be simplicity first!"
    details: Aya is designed to be as minimal as possible and easy to use through its components.
  # - title: "🎥 Video Tutorials!"
  #   details: Aya has video tutorials for beginners and advanced users.
  - title: 🏆 Best minimal code base!
    details: Aya is the best code base you can use to build complex applications.
  - title: 🧩 Integrations available!
    details: You can not only use the cdn but also the npm package and integrate it to your mithriljs, vue or react applications.
---
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
  .mit_license{
    text-align:center;
    color: #969696;
  }
  .copyright{
    text-align:center;
    color: #969696;
  }
  .hr{
    position: relative;
    width: 10%;
    color: #969696;
  }
</style>

<br/>
<br/>
<br/>

<div class="main-block">
  <hr class="hr"/>
  <p class="team"> <strong> Meet The Team. </strong></p>
</div>

<script setup>
import { VPTeamMembers } from 'vitepress/theme'


const members = [
  {
    avatar: 'profil.jpeg',
    name: 'David DOSSEH',
    title: 'Creator of Aya, software engineer.',
    links: [
      { icon: 'github', link: 'https://github.com/Duamelo' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/david-dosseh-6788101a4/' },
    ]
  },
  {
    avatar: 'romaric.jpg',
    name: 'Conité GBODOGBE',
    title: 'Software engineer',
    links: [
      { icon: 'github', link: 'https://github.com/Conite002' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/d-s-conit%C3%A9-gbodogbe-219b8222a/' },
    ]
  },
  {
    avatar: 'marie-ange.jpg',
    name: 'Marie-Ange AIKPE',
    title: 'Software engineer',
    links: [
      { icon: 'github', link: 'https://github.com/MarieAngeLeslie' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/marie-ange-aikpe-395a96175/' },
    ]
  }
]
</script>

<VPTeamMembers size="small" :members="members" />
