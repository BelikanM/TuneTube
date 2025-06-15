#!/bin/bash

# Configuration
APPWRITE_ENDPOINT="https://fra.cloud.appwrite.io/v1"
APPWRITE_PROJECT_ID="684ac07a003d5dc40eaf"
APPWRITE_API_KEY="standard_386f0cdc9e0c77d3e420276da17621df7e8ddac6d18b322fafa5740f9e349d55d291586e9317f436f0a577a7a32619b03cc9f7afa252f533a2eec7be68bcf1b57fdf9f81b9aaf9ca158eba26739933726614b87a7ebed73a9d792950fc7ad2c714583e190efa3f2bab2707d1553561c46401c76f4549e8e683af7cf82fc751ab"

# Fonction pour créer une collection
create_collection() {
  local collection_name="$1"
  local permissions="$2"
  local database_id="$3"

  echo "Création de la collection $collection_name..."

  # Créer la collection
  collection_id=$(curl -s -X POST \
    -H "X-Appwrite-Project: $APPWRITE_PROJECT_ID" \
    -H "X-Appwrite-Key: $APPWRITE_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"collectionId\": \"$collection_name\",
      \"name\": \"$collection_name\",
      \"permissions\": $permissions,
      \"databaseId\": \"$database_id\"
    }" \
    "$APPWRITE_ENDPOINT/databases/$database_id/collections" | jq -r '.$id')

  echo "Collection $collection_name créée avec l'ID: $collection_id"
  return 0
}

# Fonction pour ajouter un attribut
add_attribute() {
  local database_id="$1"
  local collection_id="$2"
  local attribute_type="$3"
  local key="$4"
  local required="$5"
  local array="$6"
  local size="$7"
  local default="$8"

  echo "Ajout de l'attribut $key ($attribute_type) à $collection_id..."

  curl -s -X POST \
    -H "X-Appwrite-Project: $APPWRITE_PROJECT_ID" \
    -H "X-Appwrite-Key: $APPWRITE_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"key\": \"$key\",
      \"type\": \"$attribute_type\",
      \"required\": $required,
      \"array\": $array,
      \"size\": $size,
      \"default\": $default
    }" \
    "$APPWRITE_ENDPOINT/databases/$database_id/collections/$collection_id/attributes" > /dev/null

  sleep 1 # Pause pour éviter les ratés
}

# ID de la base de données (à remplacer si nécessaire)
DATABASE_ID="684d804200186c972268"

# Permissions par défaut (ajustez selon vos besoins)
DEFAULT_PERMISSIONS="[
  \"read(\*)\",
  \"create(userId)\",
  \"update(userId)\",
  \"delete(userId)\"
]"

# 1. Créer la collection 'tracks'
create_collection "tracks" "$DEFAULT_PERMISSIONS" "$DATABASE_ID"

# Ajouter les attributs pour 'tracks'
add_attribute "$DATABASE_ID" "tracks" "string" "title" "true" "false" "255" "null"
add_attribute "$DATABASE_ID" "tracks" "string" "artist" "true" "false" "255" "null"
add_attribute "$DATABASE_ID" "tracks" "integer" "duration" "true" "false" "null" "0"
add_attribute "$DATABASE_ID" "tracks" "string" "genre" "true" "false" "255" "null"
add_attribute "$DATABASE_ID" "tracks" "string" "album" "false" "false" "255" "null"
add_attribute "$DATABASE_ID" "tracks" "string" "coverUrl" "false" "false" "1024" "null"
add_attribute "$DATABASE_ID" "tracks" "string" "audioUrl" "false" "false" "1024" "null"
add_attribute "$DATABASE_ID" "tracks" "string" "userId" "true" "false" "255" "null"
add_attribute "$DATABASE_ID" "tracks" "integer" "likesCount" "false" "false" "null" "0"
add_attribute "$DATABASE_ID" "tracks" "integer" "playsCount" "false" "false" "null" "0"

# 2. Créer la collection 'follows'
create_collection "follows" "$DEFAULT_PERMISSIONS" "$DATABASE_ID"

# Ajouter les attributs pour 'follows'
add_attribute "$DATABASE_ID" "follows" "string" "followerId" "true" "false" "255" "null"
add_attribute "$DATABASE_ID" "follows" "string" "followingId" "true" "false" "255" "null"
add_attribute "$DATABASE_ID" "follows" "datetime" "createdAt" "false" "false" "null" "null"

echo ""
echo "Configuration terminée avec succès!"
echo "Collections créées:"
echo "- tracks (musiques)"
echo "- follows (relations entre utilisateurs)"
