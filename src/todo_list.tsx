import { Box, Button, IconButton, TextInput } from '@vikadata/components';
import { AddOutlined, CloseMiddleOutlined } from '@vikadata/icons';
import { useCloudStorage, ViewPickerCooperated, FieldPickerCooperated, useRecords, useDatasheet, useFields } from '@vikadata/widget-sdk';
import React, { useState } from 'react';
import { Setting } from './setting';

export const TodoList: React.FC = () => {
  const datasheet = useDatasheet();
  const [viewId] = useCloudStorage<string>('selectedViewId')
  const records = useRecords(viewId);
  const [fieldId] = useCloudStorage<string>('selectedFieldId');
  const [recordInput, setRecordInput] = useState<string>();
  const addRecords = () => {
    const fieldsMap = {[fieldId]: recordInput}
    if (!datasheet) {
      return
    }
    const addRecordCheckResult =  datasheet.checkPermissionsForAddRecord(fieldsMap)
    if (!addRecordCheckResult.acceptable) {
      alert(addRecordCheckResult.message)
      return
    }
    datasheet.addRecord(fieldsMap)
  }

  const setRecord = (recordId: string, fieldMap) => {
    if (!datasheet) {
      return
    }
    const setRecordCheckResult =  datasheet.checkPermissionsForSetRecord(recordId, fieldMap)
    if (!setRecordCheckResult.acceptable) {
      alert(setRecordCheckResult.message)
      return
    }
    datasheet.setRecord(recordId, fieldMap)
  }

  const deleteRecord = (recordId: string) => {
    if (!datasheet) {
      return
    }
    const deleteRecordCheckResult =  datasheet.checkPermissionsForDeleteRecord(recordId)
    if (!deleteRecordCheckResult.acceptable) {
      alert(deleteRecordCheckResult.message)
      return
    }
    datasheet.deleteRecord(recordId)
  }

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
      <div style={{padding: '0 8px', flex: 1}}><b>{record.title}</b></div>
      <RecordDeleteButton recordId={record.recordId} onClick={deleteRecord}/>
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

const RecordDeleteButton = ({ recordId, onClick }) => {
  return (
    <IconButton icon={CloseMiddleOutlined} variant="default" onClick={() => onClick(recordId)}></IconButton>
  )
}
