# Android SDK 4.20.0 平版差异清单

## 基线

- Android 参考 tag：`SDK_4.19.1..SDK_4.20.0`
- Harmony native 工作分支：`emclient-linux/harmony-1.13.0`
- Harmony ArkTS 工作分支：`emclient_harmony/dev-1.13.0`

## Android.mk 新增文件（SDK 4.20.0 vs 4.19.1）

### 需加入 EMCLIENTCPP_SOURCE

- `src/emgroupnamecard.cpp`
  - 非 Android JNI 文件，属于 core 层。
  - 当前文件仅包含 `emgroupnamecard.h`，实现为空，类方法以内联方式定义在头文件中。
  - 建议仍加入 `emclient-linux/src/CMakeLists.txt`，保持 CMake 源文件清单与 Android.mk 的 core 文件同步。
- `src/emuserinfo.cpp`
  - 非 Android JNI 文件，属于 core 层。
  - 当前文件仅包含 `emuserinfo.h`，实现为空，类方法以内联方式定义在头文件中。
  - 建议仍加入 `emclient-linux/src/CMakeLists.txt`，保持 CMake 源文件清单与 Android.mk 的 core 文件同步。

### 跳过（Android JNI 专属）

- `src/android/com_hyphenate_chat_adapter_EMAUserInfoManagerListener.cpp`
- `src/android/com_hyphenate_chat_adapter_message_EMASenderInfo.cpp`
- `src/android/com_hyphenate_chat_adapter_EMAUserInfo.cpp`

## Native 绑定层新增/已补齐项

### 新增 NAPI 源文件

- `src/node/message/emnsenderinfo.cpp`
- `src/node/emnuserinfomanagerlistener.cpp`

### CMakeLists.txt 当前状态

- 已加入 `node/message/emnsenderinfo.cpp`。
- 已加入 `node/emnuserinfomanagerlistener.cpp`。
- 已加入 `emgroupnamecard.cpp`。
- 已加入 `emuserinfo.cpp`。

### emnnapi.cpp 当前状态

- 已注册 `EMNSenderInfo::Init(env, exports)`。
- 已注册 `EMNUserInfoManagerListener::Init(env, exports)`。

## HarmonyOS 类型声明清单

| 类别 | Android 名称 | HarmonyOS 绑定层 | `.d.ts` 声明 | HarmonyOS ETS 层（类/方法） | 目标 ETS 文件 | 状态 |
|------|-------------|------------------|--------------|----------------------------|--------------|------|
| 配置项 | `EMOptions.setEnableUserInfo()` / `isEnableUserInfo()` | `EMNChatConfigs.setEnableUserInfo()` / `getEnableUserInfo()` | `EMChatConfigs.d.ts` | `ChatOptions.setEnableUserInfo()` / `isEnableUserInfo()` | `ChatOptions.ets`, `ChatConfigPrivate.ets`, `MethodParams.ets` | 已实现，已补 `ChatOptionsParam` 透传 |
| 数据类 | `EMSenderInfo` | `EMNSenderInfo` | `EMSenderInfo.d.ts` | `ChatSenderInfo` | 新建 `ChatSenderInfo.ets` | 已实现 |
| 消息属性 | `EMMessage.getSenderInfo()` | `EMNMessage.getSenderInfo()` | `message/EMMessage.d.ts` | `ChatMessage.getSenderInfo()` | `message/ChatMessage.ets` | 已实现 |
| Manager API | `EMGroupManager.asyncUpdateGroupNamecard()` | `updateGroupNamecard` in `EMNGroupManager` | `EMGroupManager.d.ts` | `GroupManager.updateGroupNamecard()` | `GroupManager.ets` | 已实现 |
| Manager API | `EMGroupManager.getGroupNamecard()` | `getGroupNamecard` in `EMNGroupManager` | `EMGroupManager.d.ts` | `GroupManager.getGroupNamecard()` | `GroupManager.ets` | 已实现 |
| 内部能力 | native `fetchNameCards()` | `fetchGroupNamecards` in `EMNGroupManager` | — | 不暴露 ETS 公开 API | — | 与 Android Java API 对齐，不公开 `GroupManager.fetchGroupNamecards()` |
| 回调 | `EMGroupChangeListener.onUserGroupNamecardUpdated()` | `onUserGroupNamecardUpdated` in `EMNGroupManagerListener` | `EMGroupManagerListener.d.ts` | `GroupListener.onUserGroupNamecardUpdated` | `GroupListener.ets`, `GroupManager.ets` | 已实现 |
| 数据类字段 | `EMGroupMemberInfo.getUserId()` / `getNamecard()` / `getAvatarUrl()` / `getNickname()` | `EMNGroupMember` accessors | `EMGroupMember.d.ts` | `GroupMember.memberId/namecard/avatarUrl/nickname` | `GroupMember.ets` | 已实现 |
| 数据字段 | `EMUserInfo.ext` / update time | JSON 透传 | — | `UserInfo.ext`, `UserInfo.updateTime` | `UserInfo.ets`, `InnerUserInfo.ets`, `UserInfoUtils.ets` | 已实现 |
| Manager API | `EMUserInfoManager.getUserInfoWithUserIds()` | `getUserInfoFromLocal` in `EMNUserInfoManager` | `EMUserInfoManager.d.ts` | `UserInfoManager.getUserInfoById()` | `UserInfoManager.ets` | 已实现 |
| 回调 | `EMUserInfoManagerListener.onSelfUserInfoUpdate()` / `onUserInfoUpdate()` | `EMNUserInfoManagerListener` | `EMUserInfoManagerListener.d.ts` | `UserInfoListener` | 新建 `UserInfoListener.ets`, `UserInfoManager.ets` | 已实现 |

## 仍需确认

1. 版本元数据与更新日志已更新到 `1.13.0`，后续发版前需按实际发布日期再复核一次。
