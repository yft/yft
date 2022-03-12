<template>
  <div>
    <el-card style="margin: 40px 0; font-size: 20px">
      <span>正则表达式匹配</span>
      <el-divider direction="vertical" />

      <el-link
        target="_blank"
        href="https://leetcode-cn.com/problems/zheng-ze-biao-da-shi-pi-pei-lcof/"
      >
        LeetCode
      </el-link>
    </el-card>

    <el-form label-width="120px">
      <el-form-item label="字符串">
        <el-input v-model="strModel" />
      </el-form-item>
      <el-form-item label="正则">
        <el-input v-model="patternModel" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </el-form-item>
    </el-form>

    <el-divider />

    <ZhengZeBiaoDaShiPiPeiLcof1Core
      v-if="show"
      :str="str"
      :pattern="pattern"
      @reset="reset"
    />
  </div>
</template>

<script>
import ZhengZeBiaoDaShiPiPeiLcof1Core from "./ZhengZeBiaoDaShiPiPeiLcof1Core.vue";

export default {
  components: {
    ZhengZeBiaoDaShiPiPeiLcof1Core,
  },
  data() {
    return {
      show: true,
      strModel: "mississippi",
      patternModel: "a*m.*.s*p*.",
      str: "mississippi",
      pattern: "a*m.*.s*p*.",
    };
  },
  methods: {
    confirm() {
      this.str = this.strModel;
      this.pattern = this.patternModel;
      this.reset();
    },
    reset() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
