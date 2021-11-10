import React from 'react';
import { Button } from '@vikadata/components';
import { useCloudStorage, useDatasheet, useFields, useRecord } from '@vikadata/widget-sdk';
const originalRecord1 = {
  "fldoWYyU4g0Dt": "1",
  "fldYdgZE8cZTb": [
      'A3'
  ],
  "fldRJicfM9hEt": [
      {
          "id": "atc99OcpDAqfm",
          "name": "5B3DCDAA92BB476071CCB939B837E73F.png",
          "size": 915305,
          "token": "space/2021/10/28/ce5ad90c69b04fb883c73a8b03bad89f",
          "width": 1050,
          "bucket": "QNY1",
          "height": 590,
          "mimeType": "image/png",
          "url": "https://s1.vika.cn/space/2021/10/28/ce5ad90c69b04fb883c73a8b03bad89f"
      }
  ],
  "fldGToFz0IXzo": "1111",
  "fld9IMBc5XVNM": '1',
  "fldGqANzJrplJ": 10,
  "fldqQ7CiFKLgp": 10,
  "fldDw6ygWFmb6": 0.1,
  "fldzvwhhbm4qC": "2021/10/28 15:00",
  "fldMwNgurYc57": [
      '1442446474500304897'
  ],
  "fld8qGiaDuyYQ": true,
  "fldq4lxmJLZFq": 3,
  "fldnMYbCH7BV6": "11",
  "fld17TYUJoumO": "1111",
  "fldl3e7yck2bj": "wangbo",
  "fldv95TcZb8GT": 1,
  "fldwwFjuAYCt5": "2021/10/28 03:07 下午",
  "fld2FVnbQ0oeb": "2021/10/28",
  "fldw84oTXNUdO": "d2aa673f873f45439128bd5e52835477",
  "fld1xXgPnTPHw": "d2aa673f873f45439128bd5e52835477",
  "flde4x6f5grcE": ["rectzX1rq9U4v", "rectzX1rq9U4v"]
}
const originalRecord2 = {
  "fldoWYyU4g0Dt": "3",
  "fldYdgZE8cZTb": [
      {
          "id": "optNSoBeaGuCw",
          "name": "A3",
          "color": {
              "name": "blue_0",
              "value": "#DDF5FF"
          }
      },
      {
          "id": "optaIWP98KVZr",
          "name": "B3",
          "color": {
              "name": "green_0",
              "value": "#DCF3D1"
          }
      }
  ],
  "fldRJicfM9hEt": null,
  "fldGToFz0IXzo": "www.baidu.com 2222",
  "fld9IMBc5XVNM": {
      "id": "optGlhf669meT",
      "name": "3",
      "color": {
          "name": "blue_0",
          "value": "#DDF5FF"
      }
  },
  "fldGqANzJrplJ": 300.01,
  "fldqQ7CiFKLgp": 300,
  "fldDw6ygWFmb6": 0.3,
  "fldzvwhhbm4qC": "2021/10/29 15:00",
  "fldMwNgurYc57": [
      {
          "id": "1422460735546646529",
          "type": "Member",
          "name": "王波",
          "avatar": "https://s1.vika.cn/space/2020/09/11/4dce50e4ec4649b9a408a494aca28183"
      },
      {
          "id": "1442446474500304897",
          "type": "Member",
          "name": "Pengap",
          "avatar": "https://s1.vika.cn/public/2021/07/01/be102e7820444577b6791729327f98e2"
      }
  ],
  "fld8qGiaDuyYQ": true,
  "fldq4lxmJLZFq": 5,
  "fldnMYbCH7BV6": "www.baidu.com",
  "fld17TYUJoumO": "18623213198",
  "fldl3e7yck2bj": "wangbo@vikadata.com",
  "fldv95TcZb8GT": 3,
  "fldwwFjuAYCt5": "2021/10/28 03:07 下午",
  "fld2FVnbQ0oeb": "2021/10/28",
  "fldw84oTXNUdO": {
      "id": "d2aa673f873f45439128bd5e52835477",
      "type": 3,
      "name": "王波",
      "avatar": "https://s1.vika.cn/space/2020/09/11/4dce50e4ec4649b9a408a494aca28183"
  },
  "fld1xXgPnTPHw": {
      "id": "d2aa673f873f45439128bd5e52835477",
      "type": 3,
      "name": "王波",
      "avatar": "https://s1.vika.cn/space/2020/09/11/4dce50e4ec4649b9a408a494aca28183"
  },
  "flde4x6f5grcE": [
      {
          "recordId": "recb0EpYHqyU2",
          "title": "关联表1"
      },
      {
          "recordId": "recQGHsxhEisG",
          "title": "关联表3"
      },
      {
          "recordId": "rectzX1rq9U4v",
          "title": "关联表2"
      }
  ],
  "fldRHzhbmP7jL": [
      "关联表1",
      "关联表3",
      "关联表2"
  ],
  "fld9msWZPowO8": "3(标题)\nA3, B3(多选)\n0(附件)\nwww.baidu.com 2222(多行文本)\n3(单选)\n300.01(数字)\n300(货币)\n0.3\n2021/10/29 15:00\n王波, Pengap\ntrue\n5\nwww.baidu.com\n18623213198\nwangbo@vikadata.com\n3\n2021/10/28 03:07 下午\n2021/10/28\n王波\n王波\n关联表1, 关联表3, 关联表2\n关联表1, 关联表3, 关联表2\n"
}
export const SubmitRecordBtn: React.FC<any> = ({recordId}) => {
  const datasheet = useDatasheet();
  const record = useRecord(recordId)!;
  const [viewId] = useCloudStorage<string>('selectedViewId')
  const fields = useFields(viewId); 

  const insert = () => {
    if (!recordId) {
      console.log('请选择一条记录')
      return;
    }
    const r = {}
    fields.map(({id}) => {
      r[id] = record.getCellValue(id);
    })
    datasheet?.addRecord(r)
  }

  return (
    <Button color="primary" size="small" onClick={insert} block>
      insert
    </Button>
  )
}