import { Box, Button, IconButton, TextInput, Typography } from '@vikadata/components';
import { AddOutlined, CloseMiddleOutlined } from '@vikadata/icons';
import { useCloudStorage, ViewPicker, FieldPicker, useRecords, useDatasheet, usePrimaryField } from '@vikadata/widget-sdk';
import React, { useState } from 'react';

export const TodoList: React.FC = () => {
  const datasheet = useDatasheet();
  const [viewId, setViewId] = useCloudStorage<string>('selectedViewId');
  const records = useRecords(viewId);
  const [fieldId, setFieldId] = useCloudStorage<string>('selectedFieldId');
  const [recordInput, setRecordInput] = useState<string>();
  const primaryField = usePrimaryField();
  const addRecords = () => {
    const fieldsMap = { [primaryField!.id]: recordInput };
    if (!datasheet) {
      return;
    }
    const addRecordCheckResult =  datasheet.checkPermissionsForAddRecord(fieldsMap);
    if (!addRecordCheckResult.acceptable) {
      alert(addRecordCheckResult.message);
      return;
    }
    datasheet.addRecord(fieldsMap);
  };

  const setRecord = (recordId: string, fieldMap) => {
    if (!datasheet) {
      return;
    }
    const setRecordCheckResult =  datasheet.checkPermissionsForSetRecord(recordId, fieldMap);
    if (!setRecordCheckResult.acceptable) {
      alert(setRecordCheckResult.message);
      return;
    }
    datasheet.setRecord(recordId, fieldMap);
  };

  const deleteRecord = (recordId: string) => {
    if (!datasheet) {
      return;
    }
    const deleteRecordCheckResult =  datasheet.checkPermissionsForDeleteRecord(recordId);
    if (!deleteRecordCheckResult.acceptable) {
      alert(deleteRecordCheckResult.message);
      return;
    }
    datasheet.deleteRecord(recordId);
  };

  const tasks = records.map(record => {
    const cellValue = record.getCellValue(fieldId);
    const curCellValue = typeof cellValue === 'boolean' ? cellValue : false;
    return <Box
      paddingX={3}
      paddingY={3}
      borderBottom="1px solid lightgrey"
      display="flex"
      alignItems="center"
    >
      <input type="checkbox" id="check1" checked={curCellValue} onClick={() => setRecord(record.recordId, { [fieldId]: !curCellValue })} />
      <Box paddingX={2} flex={1}>{record.title}</Box>
      <RecordDeleteButton recordId={record.recordId} onClick={deleteRecord} />
    </Box>
  });
  return (
    <div style={{ overflow: 'auto', height: '100%' }}>
        <Box
          padding="16px 10px 10px"
          borderBottom="2px solid lightgrey"
        >
          <FormItem label="View">
            <ViewPicker viewId={viewId} onChange={option => setViewId(option.value)} />
          </FormItem>
          <FormItem label="Field">
            <FieldPicker viewId={viewId} fieldId={fieldId} onChange={option => setFieldId(option.value)} />
          </FormItem>
        </Box>
        {tasks}
        <Box
          paddingX={2}
          paddingY={3}
          display="flex"
          alignItems="center"
        >
          <TextInput block size="small" onChange={e => setRecordInput(e.target.value)} />
          <Button style={{ whiteSpace: 'nowrap', marginLeft: 8 }} prefixIcon={<AddOutlined />} color="primary" size="small" onClick={addRecords}>
            Add
          </Button>
        </Box>
    </div>
  );
};

const FormItem = ({ label, children }) => {
  return (
    <Box paddingY={1}>
      <Typography>{label}</Typography>
      {children}
    </Box>
  );
};

const RecordDeleteButton = ({ recordId, onClick }) => {
  return (
    <IconButton icon={CloseMiddleOutlined} variant="default" onClick={() => onClick(recordId)} />
  );
};
