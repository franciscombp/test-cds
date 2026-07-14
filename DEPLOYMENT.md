# Despliegue en GitHub Pages

Esta aplicación está 100% configurada para desplegarse automáticamente en GitHub Pages sin requerir servidor.

## Despliegue Automático (Recomendado)

La aplicación se despliega automáticamente cada vez que haces `push` a cualquiera de estas ramas:
- `main`
- `master`
- `claude/psych-test-app-depression-81ooiv`

### Pasos:

1. **Habilitar GitHub Pages**:
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - En "Build and deployment"
   - Selecciona "GitHub Actions" como source

2. **El flujo automático se ejecutará**:
   - GitHub Actions construirá la aplicación
   - La desplegará en `https://tu-usuario.github.io/test-cds/`

## Despliegue Manual

Si prefieres desplegar manualmente:

```bash
# 1. Construir la app
npm run build

# 2. Los archivos generados estarán en /dist/

# 3. Crear/cambiar a rama gh-pages
git branch -D gh-pages  # Eliminar si existe
git checkout --orphan gh-pages

# 4. Copiar archivos generados
rm -rf *
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force
```

## Verificar Despliegue

Tu aplicación estará disponible en:
```
https://tu-usuario.github.io/test-cds/
```

Reemplaza `tu-usuario` con tu nombre de usuario de GitHub.

## Archivos de Configuración

- **vite.config.js**: Configurado con `base: '/test-cds/'`
- **.github/workflows/deploy.yml**: Workflow automático de GitHub Actions
- **dist/**: Carpeta generada con la build

## Solución de Problemas

### La página no carga los estilos
- Asegúrate que `base: '/test-cds/'` esté en `vite.config.js`
- GitHub Pages puede tardar unos minutos en actualizar

### Los botones no funcionan
- Limpia el caché del navegador (Ctrl+Shift+Delete)
- Abre en una ventana privada/incógnito

### Ver logs de despliegue
- Ve a Actions en tu repositorio de GitHub
- Haz clic en el último workflow
- Verifica si pasó o falló

## Información Adicional

- La aplicación es **100% frontend** - no requiere servidor backend
- Todos los datos se procesan en el navegador del cliente
- Los archivos PDF y CSV se descargan localmente
- No se envían datos a ningún servidor
