<template>
  <footer hidden class="footer px-4 mx-2">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{ year }}
          <a href="#" class="font-weight-bold ml-1" target="_blank"
            >Appster Digital</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
<style>
.loader {
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #5e72e4;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;

  margin-left: 45%;
}
@media screen and (max-width: 680px) {
  .loader {
    margin-left: 40%;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
