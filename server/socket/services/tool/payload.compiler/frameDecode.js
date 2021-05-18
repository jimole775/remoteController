/**
 * Created by Andy on 2017/11/4.
 */
export default function (e) {
  let i = 0, j, s, frame = {
    // 解析前两个字节的基本数据
    FIN: e[i] >> 7, Opcode: e[i++] & 15, Mask: e[i] >> 7,
    PayloadLength: e[i++] & 0x7F
  }
  // 处理特殊长度126和127
  if (frame.PayloadLength == 126) {   
    frame.PayloadLength = (e[i++] << 8) + e[i++]
  }
  if (frame.PayloadLength == 127) {
    i += 4 // 长度一般用四字节的整型，前四个字节通常为长整形留空的
    frame.PayloadLength = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++]
  }
  if (frame.Mask) {// 判断是否使用掩码
    // 获取掩码实体
    frame.MaskingKey = [e[i++], e[i++], e[i++], e[i++]]
    // 对数据和掩码做异或运算
    for (j = 0, s = []; j < frame.PayloadLength; j++)
      s.push(e[i + j] ^ frame.MaskingKey[j % 4])
  } else {
    s = e.slice(i, frame.PayloadLength)//否则直接使用数据
  }
  //数组转换成缓冲区来使用
  s = Buffer.from(s)
  //如果有必要则把缓冲区转换成字符串来使用
  if (frame.Opcode == 1) {
    s = s.toString()
  }
  //设置上数据部分
  frame.PayloadData = s
  //返回数据帧
  return frame
}