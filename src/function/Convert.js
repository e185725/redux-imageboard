import React from 'react';

// YYYY-MM-DD hh:mm:ss 形式で返す
export default function convertFormat(created_at) {
  if (created_at){
    var convertedCreatedAt = created_at.split(/[T.]/);
    return convertedCreatedAt[0] + ' ' + convertedCreatedAt[1];
  }
  return '';
}