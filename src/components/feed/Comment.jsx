import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PencilSvg from '../../assets/icons/pencil.svg';

const Comment = ({feed}) => {
  const [edit, setEdit] = useState(0);
  const [comment, setComment] = useState('');

  const submitForm = () => {};

  return feed.replys.map(el => (
    <View style={styles.commentItem} key={el.nickname + el.reply}>
      <View style={styles.justifyBetween}>
        <Text style={styles.commentNickname}>{el.nickname}</Text>
        {edit === el.replyId && (
          <View>
            <TouchableOpacity onPress={() => setEdit(el.replyId)}>
              <PencilSvg width={20} height={20} color="#2e8cf4" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {edit === el.replyId ? (
        <View style={styles.commentEdit}>
          <TextInput
            style={styles.textInput}
            placeholder="댓글"
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.commentBtn} onPress={submitForm}>
            <Text style={styles.commentBtnText}>작성</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.commentText}>{el.reply}</Text>
      )}
    </View>
  ));
};

const styles = StyleSheet.create({
  commentItem: {
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    padding: 12,
  },
  justifyBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentNickname: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#999',
  },
  commentText: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#555',
    paddingVertical: 8,
  },
  commentEdit: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingRight: 8,
  },
  textInput: {
    fontFamily: 'GmarketSansTTFMedium',
    borderWidth: 1,
    padding: 12,
    height: 44,
    borderRadius: 5,
    fontSize: 16,
    borderColor: '#aaa',
    marginVertical: 12,
    marginHorizontal: 8,
    flex: 1,
  },
  commentBtn: {
    fontFamily: 'GmarketSansTTFMedium',
    backgroundColor: '#2E8CF4',
    borderRadius: 5,
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  commentBtnText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Comment;
