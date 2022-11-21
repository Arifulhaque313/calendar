<template>
  <create-form @onSubmit='submit'>
    <div class='row align-items-center'>
        <Input v-model='data.name' field='data.name' title='Calendar Name' :req='true' />

				<v-select-container title='Time_zone'> 
          <v-select v-model='data.time_zone' label='name' :reduce='(obj) => obj.value' :options='timezone' placeholder='--Select One--' :closeOnSelect='true'></v-select>
          <span v-if="validation.hasError('data.time_zone')" class='input-message danger'>{{ validation.firstError('data.time_zone') }} </span>
        </v-select-container> 
				
        <!-- <Input v-model='data.theme' field='data.theme' title='Theme' :req='true' /> -->

        <v-select-container title='Theme'> 
          <v-select v-model='data.theme' label='name' :reduce='(obj) => obj.value' :options='getTheme' placeholder='--Select One--' :closeOnSelect='true'></v-select>
          <span v-if="validation.hasError('data.theme')" class='input-message danger'>{{ validation.firstError('data.theme') }} </span>
        </v-select-container> 

        <!-- <Input v-model='data.views' field='data.views' title='Views' :req='true' /> -->

				<div class='col-12 mb-3'> <label class='form-label'>Description</label> <div class='col-12'> <editor v-model='data.description' /></div></div>				
        <!-- views  start-->
        <div class="d-flex">
          <div class="p-2">
            <input type="checkbox" id="month" value="month" v-model="data.views">
            <label class="form-label ps-1" for="month">Month</label>
          </div>
          <div class="p-2">
            <input type="checkbox" id="week" value="week" v-model="data.views">
            <label class="form-label ps-1" for="week">Week</label>
          </div>
          <div class="p-2">
            <input type="checkbox" id="day" value="day" v-model="data.views">
            <label class="form-label ps-1" for="day">Day</label>
          </div>
          
          <div class="p-2">
            <input type="checkbox" id="list" value="list" v-model="data.views">
            <label class="form-label ps-1" for="list">List</label>
          </div>
        </div>
        <!-- views end-->
    </div>
    <Button title='Submit' process='' />
  </create-form>
</template>

<script>
import Editor from '../../../components/Form/CKEditor';

// define model name
const model = 'calendar';

export default {
  components: { Editor },
  data() {
    return {
      model: model,
      data: {
        views:[],

        
      },
      timezone:[{name: 'Dhaka-Bangladesh', value : 'dhaka-bangladesh'},{name: 'New-York USA', value : 'new-york-america'}],
      getTheme:[{name: '', value : 'new-york'}]
      
    };
  },

  provide() {
    return {
      validate: this.validation,
      
    };
  },
  methods: {
    submit: function (e) {
      console.log(this.data);
      this.$validate().then((res) => {
        const error = this.validation.countErrors();
        // If there is an error
        if (error > 0) {
          console.log(this.validation.allErrors());
          this.$toast(
            'You need to fill ' + error + ' more empty mandatory fields',
            'warning'
          );
          return false;
        }

        // If there is no error
        if (res) {
          

          if (this.data.id) {
            this.update(this.model, this.data, this.data.id,);
          } else {
            this.store(this.model, this.data);
          }
        }
      });
    },
  },
  created() {
    if (this.$route.params.id) {
      this.setBreadcrumbs(this.model, 'edit');
      this.get_data(`${this.model}/${this.$route.params.id}`);
    } else {
      this.setBreadcrumbs(this.model, 'create');
    }
  },

 // validation rule for form
  validators: {
    'data.name': function (value = null) {
      return Validator.value(value).required('Name is required');
    },
		'data.time_zone': function (value = null) {
      return Validator.value(value).required('Time_zone is required');
    },
		'data.theme': function (value = null) {
      return Validator.value(value).required('Theme is required');
    },
		'data.description': function (value = null) {
      return Validator.value(value).required('Description is required');
    },
		// 'data.views': function (value = null) {
    //   return Validator.value(value).required('Views is required');
    // },

  },
}

</script>