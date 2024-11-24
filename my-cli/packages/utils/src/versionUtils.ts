// 第一步
// 获取版本的代码，也就是从 registry + 包名的地址获取 json
import axios from 'axios'
import urlJoin from 'url-join'

function getNpmregistry() {
  return 'https://registry.npmmirror.com'
}

const getNpmInfo = async (packageName: string) => {
  const register = getNpmregistry()
  // 处理 url 拼接
  const url = urlJoin(register, packageName)
  try {
    const response = await axios.get(url)
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

const getlatestVersion = async (packageName: string) => {
  const data = await getNpmInfo(packageName)
  return data['dist-tags'].latest
}

const getVersions = async (packageName: string) => {
  const data = await getNpmInfo(packageName)
  return Object.keys(data.versions)
}

export { getNpmInfo, getlatestVersion, getVersions, getNpmregistry }
