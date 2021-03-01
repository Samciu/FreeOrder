
1. 先引入
import countTo from '@/components/countTo/countTo.vue'
Vue.component('count-to',countTo);
2. 直接使用
<count-to :startVal='0' :endVal='2017' :decimals='2' :duration='2000'></count-to>