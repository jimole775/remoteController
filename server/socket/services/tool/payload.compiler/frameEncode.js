/**
 * Created by Andy on 2017/11/4.
 */
export default function (e) {
  var s = [], o = Buffer.from(e.PayloadData), l = o.length
  // 输入第一个字节
  s.push((e.FIN << 7) + e.Opcode)

  // 输入第二个字节，判断它的长度并放入相应的后续长度消息
  // 永远不使用掩码
  if (l < 126) {
    s.push(l)
  } else if (l < 0x10000) {
    s.push(126, (l & 0xFF00) >> 8, l & 0xFF)
  } else {
    // 8字节数据，前4字节一般没用留空
    s.push(127, 0, 0, 0, 0, (l & 0xFF000000) >> 24, (l & 0xFF0000) >> 16, (l & 0xFF00) >> 8, l & 0xFF)
  }

  // 返回头部分和数据部分的合并缓冲区
  return Buffer.concat([Buffer.from(s), o])
}