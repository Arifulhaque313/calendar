<template>
        <section class="registration bg">
            <div class="row">
                <div class="col-lg-6 align-self-center justify-content-end">
                <div class="text">
                    <div class="text-head">
                    <h3>Get started with easily register</h3>
                    <p>Free register and you can enjoy it</p>
                    </div>

                    <div class="form pb-4">
                        <form id="form" v-on:submit.prevent="submit" method="post">
                       

                        <div>
                            <div class="input-group">
                                <label>Full Name</label>
                                <input type="text" id="email" v-model="data.name" class="form-control shadow-none" placeholder="Richard Leone">
                            </div>
                            <div class="text-danger mb-2">{{ validation.firstError('data.name') }}</div>
                        </div>

                        <div class="mt-3">
                            <div class="input-group ">
                                <label class="mb-1">Email Address</label>
                                <input type="email" id="email" v-model="data.email" placeholder="Ladushing691@gmail.com" class="form-control shadow-none">
                            </div>
                            <div class="text-danger mb-2">{{ validation.firstError('data.email') }}</div>
                        </div>


                        <div class="mt-3">
                             <div class="input-group">
                                <label class="mb-1">Password</label>
                                <input type="password" id="password" v-model="data.password" placeholder="****************" class="form-control shadow-none">
                            </div>
                            <div class="text-danger mb-2">{{ validation.firstError('data.password') }}</div>
                        </div>

                        <div class="input-group">
                            <button type="submit" class="btn shadow-none">Submit Now</button>
                        </div>
                        
                        <div class="input-group">
                            <!-- <p> <a href="#">Sign In</a></p> -->
                            <p>Already have an account? <router-link :to="{name: 'login'}"><a>Sign in</a></router-link></p>

                        </div>
                        </form>
                    </div>
                </div>
                </div>
                <div class="col-lg-6">
                <div class="image">
                    <img src="images/reg.png" alt="reg" class="img-fluid w-100">
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
                window.location.href = this.$root.baseurl + "/nsl-login";
                
                // setTimeout(function(){
                //   // alert('hello world');
                // }, 4000);
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


<style scoped>
    .bg{
        background-color: white !important;;
    }
</style>