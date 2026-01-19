import io.github.gitbucket.solidbase.model.Version
import gitbucket.core.plugin.PluginRegistry
import gitbucket.core.service.SystemSettingsService
import javax.servlet.ServletContext
class Plugin extends gitbucket.core.plugin.Plugin {

  override val pluginId: String = "gitbucket-ace-mode-selector"

  override val pluginName: String = "GitBucket Ace Mode Selector Plugin"

  override val description: String = "A plugin that allows you to change key bindings in ace editor"

  override val versions: Seq[Version] = List(
    new Version("0.1.0")
  )

  override val assetsMappings: Seq[(String, String)] = Seq("/gams" -> "/gams/assets")

  override def javaScripts(registry: PluginRegistry, context: ServletContext, settings: SystemSettingsService.SystemSettings): Seq[(String, String)] = {
    val jsPath = settings.baseUrl.getOrElse(context.getContextPath) + "/plugin-assets/gams"
    Seq(".*/edit/.*" -> s"""
    |</script>
    |<script src="${jsPath}/gams.js" defer>
    |""".stripMargin)
  }  
}