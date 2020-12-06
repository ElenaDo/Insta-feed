<template>
  <div>
  <div v-if="!post.node.is_video" class="card insta_img"
    :style="{ backgroundImage: `url(${post.node.display_url})`}">
  </div>
  <div v-else class="card video">
    <video controls>
      <source :src="post.node.video_url">
    </video>
  </div>
  </div>
</template>

<script>
export default {
  props: { post: Object },
  name: 'Card',
};
</script>

<style>
.card {
  overflow: hidden;
  height: 240px;
  width: 240px;
  margin: .5em;
}
.insta_img {
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
}
.card video {
  width: 100%;
  height: 100%;
}
</style>
