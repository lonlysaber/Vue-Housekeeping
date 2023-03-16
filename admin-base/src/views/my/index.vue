<template>
  <div class="my">
    <div class="adminInfo">
      <el-form label-width="80px">
        <el-form-item label="管理员：">
          {{ admin.adminName }}
        </el-form-item>
        <el-form-item label="操作：">
          <el-button @click="modifyPwd()">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="disModifyPwd"
      width="30%"
      :modal-append-to-body="false"
    >
      <el-form
        ref="updateform"
        :model="modify"
        :rules="modifyRules"
        label-width="100px"
      >
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input v-model="modify.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="modify.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码确认" prop="newPwdTwo">
          <el-input v-model="modify.newPwdTwo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePwd()">确 定</el-button>
        <el-button @click="clearPwd()">清空</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    const validateOldPwd = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("旧密码不能为空"));
      } else {
      }
      callback();
    };
    const validateNewPwd = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("新密码不能为空"));
      } else {
      }
      callback();
    };
    const validateNewPwdTwo = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("确认新密码不能为空"));
      } else if (value != this.modify.newPwd) {
        callback(new Error("两次输入不相同"));
      }
      callback();
    };
    return {
      admin: {
        adminName: "",
      },
      disModifyPwd: false,
      modify: {
        olgPwd: "",
        newPwd: "",
        newPwdTwo: "",
      },
      clearModify: {
        olgPwd: "",
        newPwd: "",
        newPwdTwo: "",
      },
      modifyRules: {
        oldPwd: [
          { required: true, trigger: "blur", validator: validateOldPwd },
        ],
        newPwd: [
          { required: true, trigger: "blur", validator: validateNewPwd },
        ],
        newPwdTwo: [
          { required: true, trigger: "blur", validator: validateNewPwdTwo },
        ],
      },
    };
  },
  created() {
    this.admin.adminName = this.$store.getters.name;
  },
  methods: {
    modifyPwd() {
      this.disModifyPwd = !this.disModifyPwd;
    },
    updatePwd() {
      this.$refs.updateform.validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.modify);
          this.$store.dispatch("admin/updatePwd", data).then((res) => {
            this.$message({
              type: "success",
              message: "修改成功，请重新登录！！！",
            });
            this.$store.dispatch("admin/logout")
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)

          });
        } else {
        }
      });
    },
    clearPwd() {
      this.modify = this.clearModify;
    },
  },
};
</script>

<style scoped>
</style>
