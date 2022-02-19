<template>
  <div>
    <el-card style="margin: 40px 0; font-size: 20px">
      <span>最长递增子序列（贪心 + 二分查找）</span>
      <el-divider direction="vertical" />

      <el-link
        target="_blank"
        href="https://zh.wikipedia.org/wiki/%E6%9C%80%E9%95%BF%E9%80%92%E5%A2%9E%E5%AD%90%E5%BA%8F%E5%88%97"
      >
        Wikipedia
      </el-link>
      <el-divider direction="vertical" />

      <el-link
        target="_blank"
        href="https://leetcode-cn.com/problems/longest-increasing-subsequence/"
      >
        LeetCode
      </el-link>
    </el-card>

    <el-input
      v-model="textarea"
      :rows="2"
      type="textarea"
      placeholder="请输入以 , 分割的数字"
      style="font-size: 20px"
    />
    <el-button type="primary" style="margin-top: 10px" @click="updateInput">
      Confirm
    </el-button>

    <p style="font-size: 20px">
      &gt; input : [
      <template v-for="(num, index) in input" :key="index">
        {{ index ? " , " : "" }}
        <span :style="{ color: index === curIndex ? 'coral' : '#000' }">
          {{ num }}
        </span>
      </template>
      ]
    </p>

    <div>
      <el-button type="primary" @click="nextStep">
        Next &nbsp;
        <el-icon><caret-right /></el-icon>
      </el-button>

      <el-button type="primary" @click="startAnimation">
        Reset &nbsp;
        <el-icon><refresh-left /></el-icon>
      </el-button>
    </div>

    <svg
      :style="{
        width: '100%',
        height: '300px',
      }"
    >
      <template v-for="(arr, vIndex) in result" :key="arr[0].value">
        <template v-for="node in arr" :key="node.value">
          <text
            :x="node.x * distance"
            :y="node.y * distance"
            :fill="node.isActive ? 'coral' : '#606266'"
            style="dominant-baseline: middle; text-anchor: middle"
          >
            {{ node.value }}
          </text>
          <path
            v-if="node.prev"
            :d="`M${node.x * distance},${node.y * distance - 10}L${
              node.prev.x * distance
            },${node.prev.y * distance + 10}`"
            fill="none"
            :stroke="node.isActive ? 'coral' : 'green'"
          />
        </template>
      </template>
    </svg>
  </div>
</template>

<script>
import { CaretRight, RefreshLeft } from "@element-plus/icons-vue";

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

export default {
  components: {
    CaretRight,
    RefreshLeft,
  },
  data() {
    const input = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
    return {
      distance: 40,
      textarea: input.join(","),
      input,
      curIndex: -1,
      result: [],
      stepHold: getResolve(),
    };
  },
  methods: {
    nextStep() {
      this.stepHold.resolve();
      this.stepHold = getResolve();
    },
    updateInput() {
      if (this.textarea) {
        this.input = this.textarea.split(",").map(Number);
        this.startAnimation();
      }
    },
    async startAnimation() {
      this.curIndex = -1;
      const nodes = this.input.map((value) => ({
        value,
        prev: null,
        left: null,
        x: 1,
        y: 1,
        isActive: false,
      }));

      this.result = [];
      const result = this.result;

      let oneDimArr = [];
      let curNode = null;

      for (let i = 0; i < nodes.length; i++) {
        await this.stepHold.promise;

        this.curIndex = i;
        curNode = nodes[i];

        if (!i) {
          result.push([curNode]);
          continue;
        }

        oneDimArr = result.map((arr) => arr[arr.length - 1]);

        if (oneDimArr[oneDimArr.length - 1].value < curNode.value) {
          Object.assign(curNode, {
            prev: oneDimArr[oneDimArr.length - 1],
            y: result.length + 1,
          });
          result.push([curNode]);
          continue;
        }

        let min = 0;
        let max = oneDimArr.length - 1;
        let mid = 0;

        while (min < max) {
          mid = (min + max) >> 1;
          if (oneDimArr[mid].value < curNode.value) {
            min = mid + 1; // 精髓，min 不会越过 >= curNode.value 的第一个元素去
          } else {
            max = mid;
          }
        }

        let left = (min >= 0 && oneDimArr[min]) || null;
        Object.assign(curNode, {
          prev: (min && oneDimArr[min - 1]) || null,
          left,
          x: left ? left.x + 1 : 1,
          y: left ? left.y : 1,
        });
        result[min].push(curNode);
      }

      await this.stepHold.promise;

      this.curIndex = -1;

      {
        let lastArr = result[result.length - 1];
        let lastNode = lastArr[lastArr.length - 1];
        while (lastNode) {
          lastNode.isActive = true;
          lastNode = lastNode.prev;
        }
      }
    },
  },
  mounted() {
    this.startAnimation();
  },
};
</script>
