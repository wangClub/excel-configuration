/**
 * Created by lixin on 2019-03-14
 */

const getLizi = (req, res) => {
  res.send({
    code: '000001',
    msg: '成功',
    data: {
      pageSize: 5,
      pageNo: 1,
      total: 10,
      pageTotal: 2,
      datas: [
        {
          code: '4de924dd5ade4936ac8a3ed354ee0e33',
          name: 'test',
          remarks: '描述描述描述描述描述描述',
          count: 0,
          updateBy: 44,
        },
        {
          code: 'bd018b4e16a64eb8bab45d10e03edf86',
          name: 'test78945',
          remarks: '描述描述描述描述',
          count: 1,
          updateBy: 44,
        },
      ],
    },
  });
};


export default {
  'POST /api/get/lizi': getLizi,
};
