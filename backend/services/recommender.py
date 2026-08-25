RECOMMENDATIONS = {
    "CCI_Caterpillars": (
        "Inspect affected leaves for caterpillar activity and remove heavily "
        "damaged material where appropriate. Monitor nearby palms and follow "
        "locally recommended pest-management practices."
    ),

    "CCI_Leaflets": (
        "Inspect affected leaflets regularly and monitor for further damage. "
        "Maintain plantation sanitation and follow appropriate local "
        "pest-management recommendations."
    ),

    "Gray Leaf Spot": (
        "Remove severely affected leaf material where appropriate, maintain "
        "good plantation sanitation, improve airflow, and follow locally "
        "approved disease-management guidance."
    ),

    "Healthy_Leaves": (
        "No disease symptoms were detected. Continue routine monitoring, "
        "balanced nutrition, appropriate irrigation, and good plantation "
        "management practices."
    ),

    "Leaf Rot": (
        "Remove severely affected material, avoid excessive moisture around "
        "the foliage, maintain sanitation, and follow locally recommended "
        "disease-control measures."
    ),

    "WCLWD_DryingofLeaflets": (
        "Monitor the palm for progression of leaflet drying and inspect "
        "surrounding palms for similar symptoms. Seek local agricultural "
        "guidance if symptoms continue to spread."
    ),

    "WCLWD_Flaccidity": (
        "Monitor affected palms closely for progression of flaccidity and "
        "other associated symptoms. Maintain appropriate plantation care and "
        "consult local agricultural guidance when necessary."
    ),

    "WCLWD_Yellowing": (
        "Monitor yellowing patterns and nearby palms, maintain appropriate "
        "nutrition and irrigation, and seek local agricultural guidance if "
        "symptoms persist or spread."
    ),
}


def get_recommendation(predicted_class):
    return RECOMMENDATIONS.get(
        predicted_class,
        "Monitor the plant and consult an agricultural specialist for further guidance."
    )