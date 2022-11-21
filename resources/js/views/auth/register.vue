<template>
  <section class="login-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div
            class="login-body d-flex justify-content-center align-items-center"
          >
            <div class="login-main">
              <div class="row">
                <div class="col-lg-6">
                  <div
                    class="company-info text-center d-grid align-content-center"
                  >
                    <div class="content">
                      <div class="logo shadow-sm">
                        <img
                          :src="`${$root.baseurl}/public/images/logo.png`"
                          class="img-fluid w-100"
                        />
                      </div>
                      <div class="name">
                        <h2>Nogor Solutions Limited</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="login-title">
                    <h3>Welcome!</h3>
                    <h1>Sign Up Your Account</h1>
                  </div>
                  <form v-on:submit.prevent="submit" method="post">
                    <div class="input-groups mb-4">
                      <label for="name" class="form-label"
                        >Full name</label
                      >
                      <input
                        type="text"
                        placeholder="Full name"
                        id="name"
                        v-model="data.name"
                      />
                      <div class="text-danger">{{ validation.firstError('data.name') }}</div>
                    </div>

                    <div class="input-groups mb-4">
                      <label for="email" class="form-label"
                        >Email address</label
                      >
                      <input
                        type="email"
                        placeholder="Email Address"
                        id="email"
                        v-model="data.email"
                      />
                      <div class="text-danger">{{ validation.firstError('data.email') }}</div>
                    </div>

                    <div class="input-groups mb-3">
                      <label for="password" class="form-label">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        v-model="data.password"
                      />
                      <div class="text-danger">{{ validation.firstError('data.password') }}</div>

                    </div>

                    <div>
                      <!-- <a href="/nsl-login">Already have a accout? Sign-up here</a> -->
                      <router-link :to="{name: 'login'}">Already have a accout? Sign-in here</router-link>
                    </div>

                    <div class="button">
                      <button
                        type="submit"
                        :disabled="$root.spinner ? true : false"
                      >
                        <span v-if="$root.spinner">
                          <i class="fa fa-spinner fa-spin"></i>
                          processing...
                        </span>
                        <span v-else> Sign up </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
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
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submit() {
      // console.log(this.data);
      
      this.$validate().then((res) => {
        if (res) {
          if (this.$root.spinner) {
            return false;
          }
          this.$root.spinner = true;
          axios
            .post("/register-store", this.data)
            .then((res) => {
              if (res.status == 200) {
                this.$toast(res.data.message, "success");
                
                setTimeout(function(){
                  // alert('hello world');
                  window.location.href = this.$root.baseurl + "/nsl-login";
                }, 4000);
              } else {
                this.$toast(res.data.message, "error");
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
    "data.name": function (value = null) {
      return Validator.value(value).required("Full Name is required");
    },
    "data.email": function (value = null) {
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
