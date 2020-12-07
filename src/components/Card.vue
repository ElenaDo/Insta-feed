<template>
  <div>
  <div
    v-if="!post.node.is_video"
    class="card insta_img"
    :style="[visible && { backgroundImage: `url(${post.node.display_url})`}]"
  >
    <span class="likes">{{post.node.edge_liked_by.count}} Like(s)</span>
  </div>
  <div v-else class="card video">
    <video controls>
      <source
        v-if="visible"
        :src="post.node.video_url"
        :width="post.node.dimensions.width"
        :height="post.node.dimensions.height"
      >
    </video>
    <div class="likes">{{post.node.video_view_count}} View(s)</div>
  </div>
  </div>
</template>

<script>
export default {
  props: { post: Object },
  name: 'Card',
  data: () => ({
    visible: false,
    observer: null,
    intersected: false,
  }),
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        this.visible = true;
        this.observer.disconnect();
      }
    });
    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>

<style>
.card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
