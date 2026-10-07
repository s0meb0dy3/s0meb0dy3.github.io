---
title: Jev：AI 除了生成文字，还能直接做决策
date: 2026-9-25
description: Jev 的结构化决策、API 使用，以及一次浏览器语音自动化实践。
category: 技术
---

我们熟悉的 AI，通常通过文字回答问题：解释概念、编写代码、总结资料。但在软件里，很多时候只需要一个判断：这封邮件交给哪个部门？这段内容是否相关？下一步应该调用哪个工具？

最近，我申请了 Jev 的内测，拿到 API 资格后，做了一个浏览器语音自动化工具。现在 Jev 已经开放使用，正好介绍一下它是什么，以及怎样把它接进程序。

## Jev 是什么

TypeSafe AI 在 2026 年 9 月 15 日发布了 Jev 的早期访问版本，将它称为 **System One 模型**。这个名字借用了《思考，快与慢》中“系统一”的概念，强调快速、明确的判断。[官方介绍](https://typesafe.ai/blog/introducing-system-one-models-and-jev)

Jev 接收上下文和问题，返回预先定义的选择、评分或概率。它不生成自由文本，也不负责写文章、代码或解释推理过程。目前支持文本输入，不直接处理图像、音频和视频。[模型说明](https://docs.typesafe.ai/concepts/system-one)

比如，用户说“向下翻一点”，程序可以让 Jev 从“向上滚动、向下滚动、刷新、不支持”中选择，再根据结果执行操作。

大语言模型也能做这些事，也能输出 JSON。Jev 的特点是专门围绕结构化决策设计，无须逐个生成文本 Token。对于频繁调用、只需要简单判断的任务，这种设计有望降低延迟和成本。官方展示了很大的性能收益，但数字来自特定工作流评测，不能直接套用到所有应用。[技术与评测说明](https://typesafe.ai/blog/introducing-system-one-models-and-jev)

## 如何使用 API

可以先在 [TypeSafe 控制台](https://console.typesafe.ai)体验 Playground，再创建 API Key 接入自己的程序。

HTTP 接口是：

```text
POST https://api.typesafe.ai/v1/systemone
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

请求主要包含三个字段：`model` 指定模型，例如 `jev-latest`；`state` 提供待判断的文本或结构化上下文；`questions` 定义问题及允许的答案。返回的 `answers` 会使用相同的问题名称，便于程序读取。[API 文档](https://docs.typesafe.ai/api)

Jev 提供三种问题类型：

| 类型 | 用途 | 示例 |
| --- | --- | --- |
| Choice | 从预设选项中选择 | 应该执行哪个浏览器动作？ |
| Score | 按预设的有序等级评分 | 用户的不满程度有多高？ |
| Noul | 返回某个陈述为真的概率 | 用户是否在申请退款？ |

Choice 返回选项及其概率分布；Score 返回按概率加权的分数，因此可能落在两个等级之间。两者还包含 `confidence`。Noul 返回 0 到 1 的概率，没有单独的 `confidence` 字段。[问题类型说明](https://docs.typesafe.ai/introduction)

我的项目使用官方 Python SDK。安装并设置环境变量：

```bash
pip install typesafe-sdk
export TYPESAFE_API_KEY="你的 API Key"
```

下面是一个简化的动作选择示例：

```python
from typesafe_sdk import Choice, TypeSafeClient

client = TypeSafeClient(timeout=15)

response = client.system_one(
    model="jev-latest",
    state={"command": "向下翻一点"},
    questions={
        "operation": Choice(
            instructions="选择最符合用户指令的一个动作。",
            criteria={
                "SCROLL_UP": "向上滚动页面",
                "SCROLL_DOWN": "向下滚动页面",
                "RELOAD": "刷新当前页面",
                "BLOCKED": "指令无法通过这些动作完成",
            },
        )
    },
)

answer = response.answers["operation"]
print(answer.choice)
print(answer.probabilities)
print(answer.confidence)
```

SDK 会读取环境变量中的密钥。上面只打印判断结果，不操作浏览器；实际执行逻辑需要自己编写。[Python SDK 文档](https://docs.typesafe.ai/sdk/python)

`criteria` 中的键是程序使用的标识，值是选项的含义。选项需要写清楚，也要给无法处理的指令留一个出口，避免所有输入都被硬塞进某个动作。

## 我的浏览器语音工具
（代码还没放到github上）
我做的工具运行在 macOS 上，通过语音操作当前 Chrome。流程很直接：

```text
语音 → 语音识别 → 文字指令 + 页面候选元素
     → Jev 选择动作和目标 → 程序校验并执行
```

语音识别使用火山的流式 ASR。程序读取当前页面的 URL、标题和可点击元素，把这些信息与识别出的指令一起交给 Jev。它不把音频或页面截图交给 Jev，也不发送整页正文和表单内容。

例如，我说“点击主页”，程序先收集页面中的候选元素，再让 Jev 回答两个 Choice 问题：执行什么动作，以及点击哪个元素。

这两个问题放在同一次请求里。页面有可点击元素时，目标选择会与动作选择一起提交；程序只有在动作是 `CLICK` 时，才使用目标答案。这样可以减少一次往返请求。API 支持多个问题独立、并行地评估同一份上下文。[调用方式说明](https://docs.typesafe.ai/introduction)

目前工具支持点击、上下滚动、后退、前进、刷新、切换和关闭标签页。一次语音只执行一个动作，暂不支持输入文字、打开网址或自动完成多步任务。

Jev 负责语义判断，程序负责执行。执行前会检查当前标签页、页面快照和目标元素；如果页面已经变化，就取消操作，避免拿旧页面上的判断去操作新页面。

这个项目也让我感受到，决策速度对于交互工具很重要。用户说完一句话，期待的是页面尽快响应。减少模型等待时间有实际价值，但完整延迟还包括语音识别、页面读取、网络和动作执行，不能只看模型速度。

## 输出正确的格式，不代表做出正确的判断

Jev 的结构化输出可以避免返回候选之外的动作，但它仍可能选错动作或目标。

`confidence` 也不等于“这次判断正确的概率”。它由选项的概率分布计算，表达模型的确定程度。实际使用时，可以对不确定的结果请求补充信息或转交人工，但阈值需要用自己的任务数据验证。[置信度说明](https://docs.typesafe.ai/confidence)

我的工具目前校验候选和页面状态，没有按置信度过滤操作。这些检查能发现页面变化，却不能保证语义判断正确。要进一步提升可靠性，还需要评估容易混淆的指令和相似元素。

## 我的思考

我觉得 Jev 是一个好的创新。它把 AI 的使用方式落到了一个具体问题上：软件需要判断时，怎样更快地得到可用的结果？在分类、工具路由、内容筛选和实时交互中，这条路线确实有用武之地。

但我不太认为它会掀起很大的风浪。大模型厂商已经拥有模型、算力和开发者生态，做出类似产品、甚至超越它的竞品，我认为并不困难。最直接的产品形态，就是在现有 API 中增加一个“决策模式”字段。对开发者来说，如果原来的接口已经能满足需求，就未必需要再接入一家服务。

当然，加一个字段容易，真正达到同样的速度、成本和概率校准水平，需要模型与推理系统的支持。接口相似，不意味着底层能力相同。不过，我仍然认为 Jev 面临的竞争压力很大。

相比它最终能占据多大的市场，我更关注它现在能帮我解决什么问题。对于浏览器语音工具这样的应用，让模型快速选出一个动作，再交给代码执行，是一种值得尝试的设计。
