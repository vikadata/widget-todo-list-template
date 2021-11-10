import { Box, Button, IconButton, TextInput } from '@vikadata/components';
import { AddOutlined, CloseMiddleOutlined } from '@vikadata/icons';
import { useCloudStorage, ViewPickerCooperated, FieldPickerCooperated, useRecords, useDatasheet, useFields } from '@vikadata/widget-sdk';
import React, { useState, useEffect } from 'react';
import { SubmitRecordBtn } from './submitRecordBtn';
import { Setting } from './setting';

export const TodoList: React.FC = () => {
  const datasheet = useDatasheet();
  const [viewId] = useCloudStorage<string>('selectedViewId')
  const records = useRecords(viewId);
  const [fieldId] = useCloudStorage<string>('selectedFieldId');
  const [recordInput, setRecordInput] = useState<string>();
  const fields = useFields(viewId);
  const [selectTask, setSelectTask] = useState<string | null>()
  const addRecords = () => {
    if (datasheet && datasheet.checkPermissionsForAddRecord()) {
      datasheet.addRecord({[fieldId]: recordInput})
    } else {
      alert(datasheet.checkPermissionsForAddRecord().message)
    }
  }

  const setRecord = (recordId: string, fieldMap) => {
    if (datasheet && datasheet.checkPermissionsForSetRecord(recordId, fieldMap).acceptable) {
      datasheet.setRecord(recordId, fieldMap)
    } else {
      alert(datasheet.checkPermissionsForSetRecord(recordId, fieldMap).message)
    }
  }

  useEffect(() => {
    const obj = {};
    records.map(record => {
      const r = {}
      fields.map(({id, name}) => {
        r[id] = {value: record.getCellValue(id), title: name};
      })
      obj[record.id] = r
    })
  }, [viewId]);

  const tasks = records.map(record => {
    const cellValue = record.getCellValue(fieldId)
    const curCellValue = typeof cellValue === 'boolean' ? cellValue : false
    return <Box
      paddingX={3}
      paddingY={3}
      display="flex"
      alignItems="center"
      borderBottom="1px solid rgba(0, 0, 0, 0.1)"
      flexWrap="wrap"
    >
      <input type="checkbox" id="check1" checked={curCellValue} onClick={e => setRecord(record.recordId, {[fieldId]: !curCellValue})}/>
      <div style={{padding: '0 8px', flex: 1}}><b>{record.name}</b></div>
      <RecordDeleteButton datasheet={datasheet} recordId={record.recordId} />
      <Box
        width="100%"
        display="flex"
        paddingY={3}
        alignItems="center">
        <input type="checkbox" id="check2" checked={selectTask === record.recordId} onClick={e => setSelectTask(selectTask === record.recordId ? '' : record.recordId)}/>
        选中
      </Box>
    </Box>
  })
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1, overflow: 'auto'}}>
        <Box
          padding={'16px 10px 10px'}
          borderBottom='2px solid rgba(0, 0, 0, 0.1)'
        >
          <FormItem label="View">
            <ViewPickerCooperated cloudStorageKey={'selectedViewId'}/>
          </FormItem>
          <FormItem label="Field">
            <FieldPickerCooperated globalStorageKey={'selectedFieldId'} viewId={viewId} />
          </FormItem>
        </Box>
        {tasks}
        <Box
          paddingX={2}
          paddingY={3}
          display="flex"
          alignItems="center"
        >
          <TextInput style={{flex: 1}} size="small" onChange={e => setRecordInput(e.target.value)}/>
          <Button style={{minWidth: 'fit-content', marginLeft: 8}} prefixIcon={<AddOutlined/>} color="primary" size="small" onClick={addRecords}>
            Add
          </Button>
        </Box>
        <Box marginX={2} marginY={2}>
          <Button color="primary" size="small" onClick={() => selectTask && setRecord(selectTask, {[fieldId]: null})} block>
            clear
          </Button>
        </Box>
        <Box marginX={2}><SubmitRecordBtn recordId={selectTask}/></Box>
      </div>
      <Setting />
    </div>
  );
};

const FormItem = ({label, children}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: 16}}>
      <label style={{paddingBottom: 6, fontSize: 13, color: '#636363', fontWeight: 'bold'}}>{label}</label>
      {children}
    </div>
  )
}

const RecordDeleteButton = ({datasheet, recordId}) => {
  return (
    <IconButton icon={CloseMiddleOutlined} variant="default" onClick={() => {
      if (datasheet && datasheet.checkPermissionsForDeleteRecord(recordId).acceptable) {
        datasheet.deleteRecord(recordId)
      } else {
        alert(datasheet.checkPermissionsForDeleteRecord(recordId).message)
      }
    }}></IconButton>
  )
}
