<template>
        <section class="registration bg">
            <div class="row">
                <div class="col-lg-6 align-self-center justify-content-end">
                <div class="text">
                    <div class="text-head">
                    <h3 class="pb-5">Login to your account!</h3>
                    <!-- <p>Free register and you can enjoy it</p> -->
                    </div>

                    <div class="form pb-4">
                        <form id="form" v-on:submit.prevent="submit" method="post">
                        <div>
                            <div class="input-group">
                                <label class="mb-1">Email Address</label>
                                <input type="email" id="email" v-model="data.email" placeholder="Ladushing691@gmail.com" class="form-control shadow-none"> 
                            </div>
                            <div class="text-danger mb-1">{{ validation.firstError('data.email') }}</div>
                        </div>

                        <div class="mt-3">
                            <div class="input-group">
                                <label class="mb-1">Password</label>
                                <input type="password" id="password" v-model="data.password" placeholder="****************" class="form-control shadow-none">
                            </div>
                            <div class="text-danger">{{ validation.firstError('data.password') }}</div>
                        </div>
                        <div class="input-group mt-1">
                            <button type="submit" class="btn login-btn shadow-none " style="border-radius:8px!important;">Login to Continue</button>
                        </div>
                        
                        <div class="input-group">
                            <p>Don't have an account? <router-link :to="{name: 'reg'}"><a>Sign up</a></router-link></p>
                        </div>
                        </form>
                    </div>
                </div>
                </div>
                <div class="col-lg-6">
                <div class="image">
                    <img src="images/log.png" alt="reg" class="img-fluid w-100">
                </div>
                </div>
            </div>
        </section>

</template>

<script>

export default {
  data() {
    return {
      passwordIstext: false,
      data: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    submit() {
      this.$validate().then((res) => {
        if (res) {
          if (this.$root.spinner) {
            return false;
          }
          this.$root.spinner = true;
          axios
            .post("/login-admin", this.data)
            .then((res) => {
              if (res.status == 200 && res.data.user instanceof Object) {
                this.$store.dispatch("auth/loginStore", res.data);
                this.$toast(res.data.message, "success");
                window.location = this.$root.baseurl + "/dashboard";
              } else {
                this.$toast(res.data.message, "error");
                this.$root.spinner = false;
              }
            })
            .catch((error) => {
              this.$toast("Something went wrong, please try again", "error");
              this.$root.spinner = false;
            });
        }
      });
    },
  },

  // ================== validation rule for form ==================
  validators: {
    "data.email": function (value = null) {
      // console.log("hello");
      return Validator.value(value).required("Email is required");
    },
    "data.password": function (value = null) {
      return Validator.value(value)
        .required("Password is required")
        .minLength(6);
    },
  },
};
</script>

<style scoped>
    .bg{
        background-color: white !important;;
    }
</style>