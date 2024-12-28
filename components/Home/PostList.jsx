// components/PostList.jsx
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import OwnerInfo from '../PostDetails/OwnerInfo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Comment from './Comment'; // Ensure the correct path to the Comment component

export default function PostList({ post, userId, userName }) {
  const router = useRouter();
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);

  const openCommentModal = () => {
    setCommentModalVisible(true);
  };

  const closeCommentModal = () => {
    setCommentModalVisible(false);
  };

  // Extract userName from the post object if not provided
  const extractedUserName = post?.user?.name || userName || 'Unknown';
  const extractedUserId = post?.user?.id || userId || 'Unknown';

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/post-details',
          params: post,
        })
      }
      style={styles.postContainer}
    >
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/Profile',
            params: post,
          })
        }
        style={styles.ownerInfoContainer}
      >
        <OwnerInfo post={post} />
      </TouchableOpacity>

      {/* Post Image */}
      <Image source={{ uri: post?.imageUrl }} style={styles.postImage} />

      {/* Caption (Title) */}
      <Text style={styles.caption}>{post?.Caption}</Text>

      {/* Date and Time */}
      <Text style={styles.date}>{post?.Date}</Text>

      {/* Comments */}
      <TouchableOpacity
        style={styles.comments}
        onPress={openCommentModal}
      >
        <Ionicons name="chatbubble-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Comment Modal */}
      <Modal
        visible={isCommentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeCommentModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Comments</Text>
            <Comment postId={post?.id} onClose={closeCommentModal} userName={extractedUserName} userId={extractedUserId} />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ownerInfoContainer: {
    marginLeft: -28,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  comments: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
