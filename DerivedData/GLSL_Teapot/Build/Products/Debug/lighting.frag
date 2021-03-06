varying vec3 normal;
varying vec3 vertex_to_light_vector;
varying vec3 vertex_to_eye_vector;
varying vec2 texture_coordinate;

/*
 Uniform variables are used to communicate with your vertex or fragment shader from "outside". In your shader you use the uniform qualifier to declare the variable:
 Uniform variables are read-only and have the same value among all processed vertices. You can only change them within your C++ program.
 */
uniform sampler2D my_color_texture;

void main()
{
    const vec4 AmbientColor = vec4(0.1, 0.1, 0.1, 1.0);
    const vec4 DiffuseColor = vec4(1.0, 1.0, 1.0, 1.0);
    const vec4 SpecularColor = vec4(1.0, 1.0, 0.0, 1.0);
    
    vec3 normalized_normal = normalize(normal);
    vec3 normalize_vertex_to_light_vector = normalize(vertex_to_light_vector);
    vec3 normalized_vertex_to_eye_vector = normalize(vertex_to_eye_vector);
    
    vec3 bisector = normalize(vertex_to_light_vector + vertex_to_eye_vector);
    
    
    float DiffuseTerm = clamp(max(0.0, dot(normalized_normal, normalize_vertex_to_light_vector)), 0.0, 1.0);
    
    float SpecularTerm = clamp(max(0.0, dot(normalized_normal, bisector)), 0.0, 1.0);
    
    //vec4 texture2D(sampler2D s, vec2 coord [, float bias])
    gl_FragColor = mix(AmbientColor + DiffuseColor * DiffuseTerm + SpecularColor * pow(SpecularTerm, 80.0), texture2D(my_color_texture, texture_coordinate), 0.5);
}