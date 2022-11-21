<template>
  Dashboard
</template>

<script>
export default {
  mounted() {
    var breadcrumb = [{ route: "dashboard", title: "Dashboard" }];
    this.$store.dispatch("breadcrumb/storeLevels", breadcrumb);
  },
};
</script>