<template>
  <view class="withdraw-list">
    <view class="item b-b" v-for="(item, index) in list" :key="index">
      <view class="left">
        <view class="status">{{
          ["未知", "提现成功", "提现失败", "审核中", "拒绝", "打款中"][
            item.status
          ]
        }}</view>
        <view class="time">{{ item.updated_at }}</view>
      </view>
      <view class="right">
        <view class="money" :class="{ sucess: item.status == 1 }">
          {{ item.status == 1 ? "-" : "" }}
          {{ item.money / 100 }}元
        </view>
      </view>
    </view>
    <view class="empty-box" v-if="isListEmpty">
      <empty-list text="暂无提现记录" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
	  isListEmpty: false
    };
  },
  onLoad() {
    this.getWithdrawRecord();
  },
  methods: {
    async getWithdrawRecord() {
      const res = await this.$api.fetchWithdrawRecord();
      console.log(res);
      this.list = res.data;
      if (res.data.length == 0) {
        this.isListEmpty = true;
      }
    },
  },
};
</script>

<style lang="scss">
.withdraw-list {
  padding: 0 20rpx 20rpx;

  .item {
    display: flex;
    padding: 32rpx;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
  }
  .left {
    .time {
      margin-top: 8rpx;
      font-size: 28rpx;
      color: #666;
    }
  }
  .money {
    font-size: 40rpx;

    &.sucess {
      color: #ec5959;
    }
  }

  .empty-box {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
