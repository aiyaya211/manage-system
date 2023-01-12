<template>
    <div class="page">
        <div class="search">
            <a-input-search placeholder="输入商品内容" style="width: 200px" />
            <a-button type="primary" style="margin-left: 5px">
                添加商品
            </a-button>
        </div>
        <a-table :columns="columns" :data-source="tableData" :row-key="record => record.key">
          <template slot="operation">
            <div>
              <a-button type="primary">
                编辑
              </a-button>
              <a-button type="danger" style="margin-left: 5px;">
                删除
              </a-button>
            </div>
          </template>
        </a-table>
    </div>
</template>
<script>
const columns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '商品价格（元）',
    dataIndex: 'prices',
    key: 'prices',
  },
  {
    title: '商品重量',
    key: 'weight',
    dataIndex: 'weight',
  },
  {
    title: '创建时间',
    key: 'create_time',
    dataIndex: 'create_time',
  }, {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    fixed: 'right',
  }
];
export default {
    data() {
        return {
           columns,
           tableData: [], 
        }
    },
    created() {
      // 获取表格数据
      this.getData();
    },
    methods: {
      getData() {
        this.$axios.get('/productionlist').then(res => {
          console.log(res)
          this.tableData = res.data;
        })
      }

    }
    
    
}
</script>
<style scoped>
.page {
    padding: 10px;
}
.search {
    margin-bottom: 20px;
}
</style>