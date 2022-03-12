<template>
  <div>
    <el-form>
      <el-form-item label="操作" label-width="120px">
        <el-button type="primary" @click="nextStep">
          Next &nbsp;
          <el-icon>
            <CaretRight />
          </el-icon>
        </el-button>
        <el-button type="primary" @click="$emit('reset')">
          Reset &nbsp;
          <el-icon>
            <RefreshLeft />
          </el-icon>
        </el-button>
        <span v-show="result !== undefined" style="color: coral">
          <el-divider direction="vertical" />
          计算完成，结果为{{ result }}
        </span>
      </el-form-item>
    </el-form>

    <el-divider />

    <p>
      <span> i = {{ i }}；j = {{ j }} </span>
      ；当前单元格代表的含义为前{{ i }}个字符与前{{ j }}个正则是否匹配
    </p>
    <p>dp 当前取值：</p>

    <div
      :style="{
        display: 'inline-block',
        width: 'max-content',
        fontSize: '20px',
        border: '1px solid #eee',
      }"
    >
      <div>
        <div class="dp-cell" v-for="index in p.length + 3" :key="index">
          {{ index >= 3 ? index - 3 : index + 1 === 3 ? "j" : "" }}
        </div>
      </div>
      <div>
        <div class="dp-cell">i</div>
        <div class="dp-cell"></div>
        <div class="dp-cell"></div>
        <div
          v-for="(char, charIndex) in p"
          :key="charIndex"
          class="dp-cell"
          :style="{
            background: charIndex < j ? '#efe' : undefined,
          }"
        >
          {{ char }}
        </div>
      </div>
      <div v-for="(row, rowIndex) in dp" :key="rowIndex">
        <div class="dp-cell">{{ rowIndex }}</div>
        <div
          class="dp-cell"
          :style="{
            background: rowIndex && rowIndex <= i ? '#efe' : undefined,
          }"
        >
          {{ s[rowIndex - 1] }}
        </div>
        <div
          v-for="(col, colIndex) in row"
          :key="colIndex"
          class="dp-cell"
          :style="{
            background: i === rowIndex || j === colIndex ? '#eee' : undefined,
            color: col === true ? 'green' : col === false ? '#fcc' : undefined,
          }"
        >
          {{ col }}
        </div>
      </div>
    </div>

    <p>算法逻辑：</p>
    <highlightjs language="javascript" :code="code" />
  </div>
</template>

<script>
import { CaretRight, RefreshLeft } from "@element-plus/icons-vue";
import hljs from "highlight.js/lib/common";
import "highlight.js/styles/github.css";
import javascript from "highlight.js/lib/languages/javascript";
import hljsVuePlugin from "@highlightjs/vue-plugin";

hljs.registerLanguage("javascript", javascript);

const getResolve = () => {
  let resolve;
  const promise = new Promise((r) => {
    resolve = r;
  });
  return {
    resolve,
    promise,
  };
};

const code = `var isMatch = function (s, p) {
    const n = s.length + 1
    const m = p.length + 1
    const dp = []

    for (let i = 0; i < n; i++) dp.push(new Array(m).fill(false))

    // s='' 与 p='' 可匹配
    dp[0][0] = true

    // s='' 与 p='.*.*a*b*c*' 等正则可匹配
    for (let j = 2; j < m; j += 2) {
        dp[0][j] = dp[0][j - 2] && p[j - 1] == '*'
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            // 当前正则符号是【*】
            if (p[j - 1] == '*') {
                dp[i][j] = dp[i][j - 2] || dp[i - 1][j] && (s[i - 1] == p[j - 2] || p[j - 2] == '.')
            }
            // 当前正则符号不是【*】
            else {
                dp[i][j] = dp[i - 1][j - 1] && (s[i - 1] == p[j - 1] || p[j - 1] == '.')
            }
        }
    }

    return dp[n - 1][m - 1]
}`;

export default {
  components: {
    CaretRight,
    RefreshLeft,
    highlightjs: hljsVuePlugin.component,
  },
  props: {
    str: {
      type: String,
      required: true,
    },
    pattern: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      s: this.str,
      p: this.pattern,
      dp: [],
      result: undefined,
      stepHold: getResolve(),
      i: 0,
      j: 0,
      code,
    };
  },
  methods: {
    nextStep() {
      this.stepHold.resolve();
      this.stepHold = getResolve();
    },
    async startAni() {
      this.stepHold.resolve();
      this.stepHold = getResolve();
      this.dp = [];
      this.result = undefined;
      this.i = this.j = 0;

      let { s, p, dp } = this;
      const n = s.length + 1;
      const m = p.length + 1;

      for (let i = 0; i < n; i++) dp.push(new Array(m).fill(false));

      dp[0][0] = true;
      await this.stepHold.promise;

      for (this.j = 2; this.j < m; this.j += 2) {
        dp[0][this.j] = dp[0][this.j - 2] && p[this.j - 1] == "*";
        await this.stepHold.promise;
      }

      // i & j 与字符下标有 1 个位置的差异，所以用 s[i - 1] p[j - 1] 表示当前
      for (this.i = 1; this.i < n; this.i++) {
        for (this.j = 1; this.j < m; this.j++) {
          // 当前字符是 *
          if (p[this.j - 1] == "*") {
            dp[this.i][this.j] = Boolean(
              dp[this.i][this.j - 2] || // 一个都没有匹配上
                (dp[this.i - 1][this.j] && // 匹配了 1 个或多个
                  (s[this.i - 1] == p[this.j - 2] || p[this.j - 2] == "."))
            );
          }
          // 不是 *
          else {
            dp[this.i][this.j] = Boolean(
              dp[this.i - 1][this.j - 1] &&
                // 字符相等，或者是正则符号 .
                (s[this.i - 1] == p[this.j - 1] || p[this.j - 1] == ".")
            );
          }
          await this.stepHold.promise;
        }
      }

      this.result = dp[n - 1][m - 1];
    },
  },
  mounted() {
    this.startAni();
  },
};
</script>

<style scoped>
.dp-cell {
  display: inline-block;
  width: 60px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  vertical-align: top;
  border: 1px solid #eee;
}
</style>
