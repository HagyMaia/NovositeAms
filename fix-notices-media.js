const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Erro: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no ambiente.')
  console.error('Exemplo: SUPABASE_URL=https://xyz.supabase.co SUPABASE_SERVICE_ROLE_KEY=xxxxx node fix-notices-media.js')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

function normalizePath(media) {
  if (!media) return null
  const bucketMarker = '/object/public/notices/'
  if (media.startsWith('http')) {
    if (media.includes(bucketMarker)) {
      let path = media.split(bucketMarker)[1]
      if (path.startsWith('notices/')) path = path.replace(/^notices\//, '')
      return path
    }
    return null
  }
  if (media.startsWith('data:')) return null
  return media.startsWith('notices/') ? media.replace(/^notices\//, '') : media
}

async function run() {
  console.log('Conectando ao Supabase...')
  const { data: notices, error: selectError } = await supabase
    .from('notices')
    .select('id,media')
    .limit(500)

  if (selectError) {
    console.error('Erro ao buscar notices:', selectError)
    process.exit(1)
  }

  if (!notices || notices.length === 0) {
    console.log('Nenhum aviso encontrado.')
    return
  }

  console.log(`Encontrados ${notices.length} avisos. Verificando...`)

  let updated = 0
  for (const notice of notices) {
    const media = notice.media
    const path = normalizePath(media)
    if (!path) {
      console.log(`[SKIP] id=${notice.id} media não é convertível: ${media?.slice(0, 100)}`)
      continue
    }

    const { data: publicData, error: publicError } = supabase.storage
      .from('notices')
      .getPublicUrl(path)

    if (publicError) {
      console.error(`[ERROR] id=${notice.id} path=${path} =>`, publicError)
      continue
    }

    const publicUrl = publicData?.publicUrl
    if (!publicUrl) {
      console.log(`[SKIP] id=${notice.id} não foi possível gerar publicUrl para path=${path}`)
      continue
    }

    if (publicUrl === media) {
      console.log(`[OK] id=${notice.id} já está normalizado`)  
      continue
    }

    const { error: updateError } = await supabase
      .from('notices')
      .update({ media: publicUrl })
      .eq('id', notice.id)

    if (updateError) {
      console.error(`[ERROR] id=${notice.id} ao atualizar:`, updateError)
      continue
    }

    console.log(`[UPDATE] id=${notice.id} => ${publicUrl}`)
    updated += 1
  }

  console.log(`Normalização concluída. Registros atualizados: ${updated}`)
}

run().catch((err) => {
  console.error('Erro inesperado:', err)
  process.exit(1)
})
