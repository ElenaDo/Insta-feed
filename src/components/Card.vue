<template>
  <div>
  <div v-if="!post.node.is_video" class="card insta_img"
    :style="{ backgroundImage: `url(${post.node.display_url})`}">
    <span class="likes">{{post.node.edge_liked_by.count}} Likes</span>
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
  display: flex;
  align-items: flex-end;
  justify-content: center;
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
.likes {
  color: white;
  width: 100%;
  padding: 0.3em;
  font-weight: bolder;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
